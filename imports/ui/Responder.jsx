import React, {Component} from 'react';
import { TextField, Button } from '@material-ui/core'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import anime from 'animejs';
import Input from '@material-ui/core/Input';
import {geolocated} from 'react-geolocated';
import Geocode from 'react-geocode'
import { withTheme } from '@material-ui/core/styles';

class Responder extends Component {
    constructor (props) {
        super(props);
        this.state = {}
        this.send = this.send.bind(this)
        this.location = this.location.bind(this)
        this.handleChange = this.handleChange.bind(this);

    }
    componentDidMount () {
        anime({
            targets:'#g',
            translateY: '0%',
            delay:anime.stagger(500, {start:500}),
            easing: 'easeOutQuad'
        })
    }    
    send() {
        console.log(this.state) 
        let taddress = this.state.add + ', ' + this.state.city + ", " + this.state.state;
        let coords = this.state.coords;
        console.log(coords)
        Geocode.setApiKey("AIzaSyDwycw2h_XzL94n0bSXRxbXX8rrSXOaD3w");

        Geocode.fromAddress(taddress).then(
            response => {
              const { lat, lng } = response.results[0].geometry.location;
              console.log(lat, lng);
              
              window.location = './map?lat1=' + coords[0] + ',lng1=' + coords[1] + ',lat2=' + lat + ',lng2' + lng;
            },
            error => {
              console.error(error);
            }
          );
    }
    location() {
        let lat = this.props.coords['latitude'];
        let long = this.props.coords['longitude'];      
        this.setState({coords: [lat, long]})
    }
    handleChange(e){
        var type = e.target.name;
        var val = e.target.value;
        
        if (type == 'add'){
          this.setState({add: val});
        }
        else if (type == 'city'){
          this.setState({city: val});
        }
        else if (type == 'state'){
          this.setState({state: val});
        }
        else if (type == 'zip'){
          this.setState({zip: val});
        }        
    }
    render() {
        console.log(window.location.search)
        return (
            <Grid style={{top:'30%'}} container justify='center' spacing={0}>                
                <Grid id="g" item xs={4} style={{height:'90vh', border: '1px solid black', backgroundColor:'white', transform:'translateY(-100%)'}}>
                    <div style={{width:'80%', margin:'50% auto'}}>
                        <h1 style={{textAlign:'center'}}>
                            Current Location
                        </h1>
                        {this.props.coords?<Button variant="outlined" onClick={this.location} style={{width:'100%'}}>Get Location Via GPS</Button>:<div></div>}                                        
                        {this.state.coords?
                            <div>                                
                                Coordinates Received!
                            </div>

                            :<div/>}
                    </div>
                    
                    
                </Grid>
                <Grid id="g" item xs={4} style={{height:'90vh', border: '1px solid black', backgroundColor:'#EEEEEE', transform:'translateY(-100%)'}}>                    
                    
                    <div style={{width:'80%', margin:'50% auto'}}>                                                    

                        <h1 style={{textAlign:'center'}}>Destination</h1>

                        <TextField
                        label="Address"                                
                        type="text"
                        name="add"
                        autoComplete="Address"
                        margin="normal"
                        fullWidth={true}
                        variant="outlined"
                        onChange={this.handleChange}
                        
                        /> 
                        <TextField
                            label="City"  
                            type="text"
                            name="city"
                            autoComplete="City"
                            margin="dense"
                            variant="outlined"
                            fullWidth={true}

                            onChange={this.handleChange}
                        />                                                                   
                        <TextField
                            label="State"                                
                            type="text"
                            name="state"
                            autoComplete="State"
                            margin="normal"
                            variant="outlined"
                            fullWidth={true}

                            onChange={this.handleChange}
                        />                                                            
                        <TextField
                            label="Zip"                                
                            type="number"
                            name="zip"
                            autoComplete="Zip"
                            margin="normal"
                            variant="outlined"
                            fullWidth={true}

                            onChange={this.handleChange}
                        />                                                                                                                                                                                    
                    </div>
                </Grid>
                <Grid id='g' item xs={4} style={{height:'90vh', border: '1px solid black', backgroundColor: 'white', transform:'translateY(-100%)'}}>
                    <div style={{width:'80%', margin:'50% auto'}}>                        
                        <h1 style={{textAlign:'center'}}>
                            Search For Nearby Requests
                        </h1>
                        <Button variant="outlined" onClick={this.send} style={{width:'100%',}}>Submit</Button> 
                    </div>
                </Grid>
            </Grid>
        )
    }
}

export default geolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
  })(Responder);