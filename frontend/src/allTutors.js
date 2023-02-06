import Tutors from './tutor.js';
import React, {Component} from 'react';

class SearchBar extends Component{
    constructor(props){
      super(props);
      this.handleTextChange1 = this.handleTextChange1.bind(this);
      this.handleAvailability1 = this.handleAvailability1.bind(this);
    }
    handleTextChange1(e){
      this.props.filterText(e.target.value);
    }
    handleAvailability1(e){
      this.props.filterAvailibility(e.target.checked);
    }
    render(){
      return(
        <div className='row'>
          <form >
            <h1>All Tutors</h1>
            <input 
              type="text" 
              placeholder = "Quick search for tutors..."
              value = {this.props.searchText}
              onChange = {this.handleTextChange1}
            />
            <p>
              <input
                type="checkbox"
                checked = {this.props.available}
                onChange = {this.handleAvailability1}
              />
              show tutors available today
            </p>
          </form>
        </div>
      )
    }
  }
  
  
  
  class AllTutors extends Component {
    constructor(props){
      super(props);
      this.state = {
        tutors:[],
        searchText : "",
        available : false,
      }
      this.handleTextChange = this.handleTextChange.bind(this);
      this.handleAvailability = this.handleAvailability.bind(this);
      this.allTutors = [];
    }
  
    handleTextChange(t){
      this.setState({
        searchText : t,
      })
      this.applyChange(t, this.state.available);
    }
    handleAvailability(a){
      this.setState({
        available : a,
      }) 
      this.applyChange(this.state.searchText, a);
    }
  
    applyChange(t, a){
      let newTutors = [];
      this.allTutors.forEach((v0)=>{
          if(v0.name.indexOf(t) === -1 && v0.subject.indexOf(t) === -1){
            return
          }
          if(a && !v0.available){
            return
          }
          newTutors.push(v0);
      })
  
      this.setState({
        tutors : newTutors
      })
    }
  
    componentDidMount(){
      fetch('http://localhost:3000/allTutorsList', {
      // fetch("tutors.json", {
        headers : {
          'Content-Type' : 'application/json',
          'Accept' : 'application/json'
        }
      })
      .then(res => res.json())
      .then((data) => {
        this.setState({tutors : data})
        this.allTutors = data;// set original data to a constant array
        // console.log(this.state.tutors)
        // console.log(this.allTutors);
      })
      .catch(console.log)
    }
  


    render() {
        return(
        <>
            <SearchBar 
                searchText = {this.state.searchText} 
                available = {this.state.available}
                filterText = {this.handleTextChange}
                filterAvailibility = {this.handleAvailability}
            />
            <Tutors tutorlist = {this.state.tutors}/>
        </>
        )
    }
}
export default AllTutors