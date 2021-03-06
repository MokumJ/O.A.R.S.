import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { connect } from 'react-redux'
import {createRowersAndShip} from '../actions/rowers/create'
import {fetchboatRowers} from '../actions/rowers/fetch'
import './SearchRower.css'
import SnackbarSave from './SnackbarSave'


const styles = {
  customWidth: {
      width: 200,
    },
};


class SearchRowerandShip extends React.Component {

constructor(props) {
  super(props);
  this.state = {
    selectedRowers: [],
    selectedShipValue: 0
  };
}

//getting selected rowers, making request
componentWillMount() {
  const { trainingId, boat_number_name } = this.props
    this.props.fetchSelectedRowers (trainingId, boat_number_name)
}

//to show saved rowers and ship
//boatRowers - rowers and ship that belong to this boat
componentWillReceiveProps(nextProps) { //is invoked before the component receives new props
  if (this.props.boatRowers !== nextProps.boatRowers) { //if we have changes
    const newSelectedRowers = [];
    //console.log(nextProps.boatRowers.rowers);
    //console.log(nextProps.rowers);
    nextProps.boatRowers.rowers.forEach(boatRower => {
      var newrower = nextProps.rowers.find(rower => rower.id === boatRower.Id);
      if (newrower !== undefined) {
        newSelectedRowers.push(newrower);
      }
    });
    this.setState({ //perform state transitions
      selectedRowers: newSelectedRowers
    });
    nextProps.boatRowers.ships.forEach(boatShip => {
      var newship = nextProps.ships.find(ship => ship.id === boatShip.Id);
      if (newship !== undefined) {
        this.setState({
          selectedShipValue: nextProps.ships.indexOf(newship)
        });
      }
    });
  }
}

saveRowersandShip() {

//console.table(this.state)

const rowers = this.state.selectedRowers.map(rower => rower.id);

const shipId = this.props.ships[this.state.selectedShipValue].id

  console.table(rowers)
  this.props.save(rowers, shipId, this.props.trainingId, this.props.boat_number_name)

}

handleRowerChange = (event, index, value) => {
  var newRower = this.props.rowers[value];
  var newSelectedRowers = this.state.selectedRowers.slice(); //clone of selectedRowers
  var indexOfRower = this.state.selectedRowers.indexOf(newRower);
    if (indexOfRower === -1) {
      newSelectedRowers.push(newRower)
    } else {
      newSelectedRowers.splice(indexOfRower, 1);
    }
  this.setState({
    selectedRowers: newSelectedRowers
  });
}



deleteRower = (index) => {
  var newSelectedRowers = this.state.selectedRowers.slice();
  if (index !==  -1) {
      newSelectedRowers.splice(index, 1);
  }
  this.setState({
    selectedRowers: newSelectedRowers
  });
}

handleShipChange = (event, index, value) => {
  this.setState({
    selectedShipValue: value
  });
}

renderRower(rower, index ) {
  return (
    <MenuItem key={index}
    value={index}
    insetChildren={true}
    checked={this.state.selectedRowers.includes(rower)}
    primaryText={`${rower.firstname} ${rower.lastname}`}/>
  )
}
renderShip(ship, index ) {
  return (
    <MenuItem key={index} value={index} primaryText={`${ship.name} ${ship.type}`}/>
  )
}
render() {
  const {rowers, ships} = this.props
  const listItems = this.state.selectedRowers.map((selectedRower) =>
      <li> { selectedRower.firstname } &nbsp;
            { selectedRower.lastname } &nbsp;
        <i className="material-icons pointer"  onClick={() => this.deleteRower(selectedRower)}>delete</i>
      </li>
    );
  return (

    <div className="selector">
    <SelectField
    multiple={true}
    style={styles.customWidth}
    hintText="Select a name"
    onChange={this.handleRowerChange}>
    {rowers.map(this.renderRower.bind(this))}
    </SelectField>
    <div >
     <ol className="horizontal">
      {listItems}
     </ol>
    </div>
    <div className='selectship'>
       <SelectField
    value={this.state.selectedShipValue}
    style={styles.customWidth}
    hintText="Select a ship"
    onChange={this.handleShipChange}>
    {ships.map(this.renderShip)}
    </SelectField>
    <div className = 'snackbar'>
     <SnackbarSave handleSave={this.saveRowersandShip.bind(this)} />
    </div>
    </div>
    </div>

    );
  }
}

const mapStateToProps = ({ rowers, ships, boatRowers }) => ({ rowers, ships, boatRowers })

const mapDispatchToProps = { save : createRowersAndShip, fetchSelectedRowers: fetchboatRowers }

export default connect(mapStateToProps, mapDispatchToProps)(SearchRowerandShip)
