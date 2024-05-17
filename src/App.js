import { Component } from "react";

class App extends Component{
state = {
  query : "",
  names : [],
  valueName : ""
}
  
   
  onChangeSerach = event =>{
    this.setState({query : event.target.value},this.renderSerach)
  }
  renderSerach = async ()=>{
    const{query} = this.state
    const options = {
      method : "GET"
    }
    const response = await fetch(`https://swapi.dev/api/people/?search=${query}`,options)
    const responseData = await response.json()
    if(response.ok){
      
      const data = await responseData.results.map(eachData => ({
        name : eachData.name
      }))
      
      this.setState({names : data})
      console.log(responseData)
    }
  }
  onClickBtn = ()=>{
    const{names} = this.state
    const name = names.map(eachValue => ({valueName : eachValue.name}))
    console.log(name)
 }
  render(){
    const{names,valueName,query} = this.state
    const length = names.length === 0
    const{name} = names
    console.log(name)
    return(
      <div className="bg">
        <h1>Enter person name</h1>
        <input value={query} onChange={this.onChangeSerach}/>
        {length ? <p>no search results found</p> : (names.map(eachName => (
          <div >
            <button key = {eachName.id} onClick={()=>this.onClickBtn()}>{eachName.name}</button>
          </div>
        )))}
        
      </div>
    )
  }
}
export default App