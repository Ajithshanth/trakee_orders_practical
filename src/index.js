import React from 'react'
import {render} from 'react-dom';
import './index.css';





class OrdersTable extends React.Component{

    
  constructor(props){
    super(props)
    this.state = {
      order: [],
      isLoading: false,
      isError: false,
    }
  }

  async componentDidMount() {
    this.setState({ isLoading: true })
    const response = await fetch('https://my-json-server.typicode.com/dsrishi/orders/orders')
    if (response.ok) {
      const order = await response.json()
      
      console.log(order)
      this.setState({ order, isLoading: false })
    } else {
      this.setState({ isError: true, isLoading: false })
    }
  }

/*  renderTableHeader = () =>{

   return Object.keys(this.state.order[0]).map(attr => <th key ={attr}> 
      {attr.toUpperCase()}
    </th>)
   }
    */
  
  branchFilter = () => {
    return this.state.order.map(order => {
      return (
        <option>{order.branch}</option>
      )
    })
  }

  serviceFilter = () => {
    return this.state.order.map(order => {
      return (
        <option>{order.service}</option>
      )
    })
  }
  
  renderTableRows = () => {
    return this.state.order.map(order => {
      return (
        <tr key={order.id}>
        <td> Blank </td>  
        <td>{order.id}</td>  
        <td>{`${order.customer.name}, ${order.customer.city}`}</td>
        <td>{order.addedby}</td>  
        <td>{order.reference}</td>  
        <td>{order.branch}</td>  
        <td>{order.service}</td>  
        <td>{order.status}</td>  



        </tr>
      )
    })
  }

  render() {
    const tableStyle = {
      width: "100%",
      padding: "10px",
      borderWidth:"2px", 
      borderColor:"#aaaaaa", 
      borderStyle :'solid',
      textAlign: "left",
      fontFamily: "Arial"
    };




    const { order, isLoading, isError } = this.state
    
    if (isLoading) {
      return <div>Loading...</div>
    }

    if (isError) {
      return <div>Error</div>
    }
    
    return  order.length >0
    ?(
      <>
      <div style = {{fontFamily:"Arial"}}>
          <h1>Orders</h1>
      </div>
      
      <div class = "searchMenu">
      <div>
      <div>Filter by branch</div> 
      <select>
        <option>All</option>
        {this.branchFilter()}
      </select>
      </div> 

      <div style = {{marginLeft:"25px"}}>
      <div >Filter by service</div>
      <select>
        <option>All</option>
        {this.serviceFilter()}
      </select>
      </div> 
    </div>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Order ID</th>
            <th>CUSTOMER</th>
            <th>ADDED BY</th>
            <th>REFERANCE</th>
            <th>BRANCH</th>
            <th>SERVICE</th>
            <th>STATUS</th>
          </tr>
          
        </thead>
        <tbody style = {tableStyle}>
          {this.renderTableRows()}
        </tbody>
      </table>
      </>
    ):(
      <div> No order </div>
    )

  }

}



render(<div>
    <OrdersTable/>
</div>, document.getElementById('root')
)


