import React, { Component } from 'react';
import { AppState, BackHandler } from 'react-native';

import {
  BarcodeTracking,
  BarcodeTrackingBasicOverlay,
  BarcodeTrackingBasicOverlayStyle,
  BarcodeTrackingSettings,
  Symbology,
} from 'scandit-react-native-datacapture-barcode';

import {
  Camera,
  DataCaptureContext,
  DataCaptureView,
  FrameSourceState,
  VideoResolution,
  Brush,
  Color,
} from 'scandit-react-native-datacapture-core';

import { requestCameraPermissionsIfNeeded } from '../../services/camera_permission_handler';

import FloatingComponents from '../../components/floatingComponents';

import secret from '../../config/secret.json';

export default class Scan extends Component 
{

  constructor() 
  {
    
    super();

    // Create data capture context using your license key.
    this.dataCaptureContext = DataCaptureContext.forLicenseKey( secret.scandit_license_key );
    this.viewRef = React.createRef();

    // this.results = {};

    this.state = {

      orderRegisters : [],
      orderRegistersFound : [],

    }

  }

  componentDidMount() 
  {

    AppState.addEventListener( 'change', this.handleAppStateChange );

    this.setupScanning();

    // this.props.navigation.addListener('focus', () => {

    //   this.results = {};

    // });
    
    this.setState({

      orderRegisters : this.props.route.params.orderRegisters ? this.props.route.params.orderRegisters : [],

    });

    this.startCapture();

  }

  componentWillUnmount() 
  {

    AppState.removeEventListener( 'change', this.handleAppStateChange );
    
    this.dataCaptureContext.dispose();
    
  }

  handleAppStateChange = async ( nextAppState ) => {
  
    if ( nextAppState.match(/inactive|background/) ) {
  
      this.stopCapture();
  
    } else {
  
      this.startCapture();
  
    }
  
  }

  startCapture() 
  {
  
    this.startCamera();
    this.barcodeTracking.isEnabled = true;
  
  }

  stopCapture() 
  {
  
    this.barcodeTracking.isEnabled = false;
    this.stopCamera();
  
  }

  goToResults() 
  {

    var places = [];

    this.state.orderRegisters.forEach( item => {

      places.filter( place => place.support === item.support ).length <= 0 
      && 
      places.push({
        
        support : item.support

      });

    });
    
    const orderRegistersNotFound = this.state.orderRegisters.filter( register => !this.state.orderRegistersFound.some( ( item ) => {
      
      return item.box_id === register.box_id; 

    } ) );

    this.props?.navigation?.navigate( 'Results', {

      orderRegistersFound : this.state.orderRegistersFound,
      orderRegistersNotFound,
      places,

    } );

  }

  stopCamera() 
  {
    
    if ( this.camera ) {
    
      this.camera.switchToDesiredState( FrameSourceState.Off );
    
    }
  
  }

  startCamera() 
  {
    
    if ( !this.camera ) {
    
      // Use the world-facing (back) camera and set it as the frame source of the context. The camera is off by
      // default and must be turned on to start streaming frames to the data capture context for recognition.
      this.camera = Camera.default;
      this.dataCaptureContext.setFrameSource( this.camera );

      const cameraSettings = BarcodeTracking.recommendedCameraSettings;

      cameraSettings.setProperty("api", 2);
      // cameraSettings.preferredResolution = VideoResolution.FullHD;
      cameraSettings.preferredResolution = VideoResolution.UHD4K;
      
      this.camera.applySettings( cameraSettings );

    }

    // Switch camera on to start streaming frames and enable the barcode tracking mode.
    // The camera is started asynchronously and will take some time to completely turn on.
    requestCameraPermissionsIfNeeded()
      .then(() => this.camera.switchToDesiredState( FrameSourceState.On ))
      .catch(() => BackHandler.exitApp());

  }

  setupScanning() {

    // The barcode tracking process is configured through barcode tracking settings
    // which are then applied to the barcode tracking instance that manages barcode tracking.
    const settings = new BarcodeTrackingSettings();

    // The settings instance initially has all types of barcodes (symbologies) disabled. For the purpose of this
    // sample we enable a very generous set of symbologies. In your own app ensure that you only enable the
    // symbologies that your app requires as every additional enabled symbology has an impact on processing times.
    settings.enableSymbologies([

      Symbology.EAN13UPCA,
      Symbology.EAN8,
      Symbology.UPCE,
      Symbology.Code39,
      Symbology.Code128,

    ]);

    // Create new barcode tracking mode with the settings from above.
    this.barcodeTracking = BarcodeTracking.forContext( this.dataCaptureContext, settings );

    // Register a listener to get informed whenever a new barcode is tracked.
    this.barcodeTrackingListener = {

      didUpdateSession: ( _, session ) => {

        Object.values( session.trackedBarcodes ).forEach( trackedBarcode => {

          const { data } = trackedBarcode.barcode;

          var found = false;
 
          // Keep track of all non-rejected barcodes.
          if ( found = this.isLookingFor( data ) ) {
            
            const alreadyAdded = this.state.orderRegistersFound.some( register => register === found );

            !alreadyAdded && this.setState({ orderRegistersFound : this.state.orderRegistersFound.concat([ found ]) });

          }

        });

      }

    };

    this.barcodeTracking.addListener( this.barcodeTrackingListener );

    // Add a barcode tracking overlay to the data capture view to render the location of captured barcodes on top of
    // the video preview. This is optional, but recommended for better visual feedback.
    const overlay = BarcodeTrackingBasicOverlay.withBarcodeTrackingForViewWithStyle(
        
      this.barcodeTracking,
      this.viewRef.current,
      BarcodeTrackingBasicOverlayStyle.Frame
    
    );

    // Implement the BarcodeTrackingBasicOverlayListener interface. 
    // The method BarcodeTrackingBasicOverlayListener.brushForTrackedBarcode() is invoked every time a new tracked 
    // barcode appears and it can be used to set a brush that will highlight that specific barcode in the overlay.
    overlay.listener = {
    
      brushForTrackedBarcode: ( overlay, trackedBarcode ) => {
    
        // Return a custom Brush based on the tracked barcode.
        const { barcode } = trackedBarcode;

        // if (barcode.data.isRejected()) {
        if ( ! this.isLookingFor( barcode.data ) ) {
          
          return new Brush( Color.fromRGBA( 255, 255, 255, 0 ), Color.fromHex( '#FA4446' ), 3 );
        
        } 
        else {
        
          return new Brush( Color.fromRGBA( 255, 255, 255, 0 ), Color.fromHex( '#26D381' ), 3 );
        
        }

      },

    };

  }

  isLookingFor = ( value ) => {

    return this.state.orderRegisters.find( register => register.box_id === value );
  
  }
  
  render() 
  {
 
    return (
 
      <>
        <DataCaptureView style={{ flex: 1 }} context={ this.dataCaptureContext } ref={ this.viewRef } />
        
        <FloatingComponents indicatorValue={ 
        
          `${ this.state.orderRegistersFound.length }/${ this.props.route.params.orderRegisters ? this.props.route.params.orderRegisters.length : "0" }`
        
        } buttonOnPress={ () => this.goToResults() }/>
      </>
    
    );
  
  };

}