import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { fetchRowers } from '../actions/rowers/fetch'
import RowersEditor from './RowersEditor'
import avatar from '../img/avatar.png'
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import Avatar from 'material-ui/Avatar';
import { Card } from 'material-ui/Card'
import './RowersContainer.css'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';


class RowersContainer extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      filteredRowers: [],
      searchInput: ''
    };
  }

  componentWillMount() {
    this.props.fetchRowers()
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      filteredRowers: nextProps.rowers
    })
  }

  linkToOneRower = rowerId => event => this.props.push(`/rowers-path/${rowerId}`);

  handleChange = (event) => {
    this.setState({
      searchInput: event.target.value,
    });
   };
  searchOneRower() {
    const filteredRowersForSeatch = this.props.rowers.filter(rower => rower.firstname.toUpperCase() === this.state.searchInput.toUpperCase());
    this.setState({
      filteredRowers: filteredRowersForSeatch
    })
  }
  reset() {
    this.setState({
      filteredRowers: this.props.rowers
    })
  }
  render() {

  return (
    <div>
<<<<<<< HEAD
      <div className = 'List'>
        <List>
          {this.state.filteredRowers.sort(function(a, b){
            if (a.firstname < b.firstname) {
              return -1
            } else if (a.firstname > b.firstname) {
              return 1
            } else {
              return 0
            }
          }).map((rower) => (
            <ListItem key={rower.id} leftAvatar={
               <Avatar src= {avatar} size={30}  />}
                style={{  margin: '50x', padding: '0,5rem',  }}
                onClick={this.linkToOneRower(rower.id)}>{rower.firstname} {rower.lastname}
            </ListItem>
          ))}
        </List>
      </div>
      <div className = 'editor'>
      <TextField
        value={this.state.searchInput}
        onChange={this.handleChange}
      />
      <div className="actions">
        <RaisedButton
        onClick={this.searchOneRower.bind(this)}
        label="Search a rower"
        />
        <RaisedButton
        onClick={this.reset.bind(this)}
        label="Reset"
        />
      </div>
        <RowersEditor />
      </div>
=======
      <Card>
        <div className = 'editor'>
          <RowersEditor />
        </div>
      </Card>
      <Card >
        <div className = 'List'>
          <List>
            {this.props.rowers.sort(function(a, b){
              if (a.firstname < b.firstname) {
                return -1
              } else if (a.firstname > b.firstname) {
                return 1
              } else {
                return 0
              }
            }).map((rower) => (
              <ListItem key={rower.id} leftAvatar={
                 <Avatar src= {avatar} size={30}  />}
                  style={{  margin: '50x', padding: '0,5rem',  }}
                  onClick={this.linkToOneRower(rower.id)}>{rower.firstname} {rower.lastname}
              </ListItem>
            ))}
          </List>
        </div>
      </Card >
>>>>>>> def91ae8c24a7a020420207cd28282639e3e81ad
    </div>
    )
  }
}

const mapStateToProps = ({ rowers }) => ({ rowers })
export default connect (mapStateToProps, {fetchRowers, push}) (RowersContainer)
