import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addCustomerAction,
  addManyCustomersAction,
  deleteCustomerAction,
} from "./store/customerReducer";
import { fetchCustomers } from "./asyncActions/customers";

function App() {
  const dispatch = useDispatch();
  const cash = useSelector((state) => state.cash.cash);
  console.log("Get cash state:", cash);
  const customers = useSelector((state) => state.customers.customers);
  console.log("Get customers state:", customers);

  const getCash = (cash) => {
    dispatch({ type: "GET_CASH", payload: cash });
  };
  const addCash = (cash) => {
    dispatch({ type: "ADD_CASH", payload: cash });
  };

  const addCustomer = (name) => {
    const customer = {
      name,
      id: Date.now(),
    };
    dispatch(addCustomerAction(customer));
  };
  const deleteCustomer = (customer) => {
    dispatch(deleteCustomerAction(customer.id));
  };

  return (
    <div className={"app"}>
      <div style={{ fontSize: "3rem" }}>{cash}</div>
      <div style={{ display: "flex" }}>
        <button onClick={() => addCash(Number(prompt()))}>Add Cash</button>
        <button onClick={() => getCash(Number(prompt()))}>Get Cash</button>
        <button onClick={() => addCustomer(prompt())}>Add Customer</button>
        <button onClick={() => dispatch(fetchCustomers())}>
          Add Customers from base
        </button>
      </div>
      {customers.length > 0 ? (
        <div>
          {customers.map((customer) => (
            <div
              key={customer.id}
              onClick={() => deleteCustomer(customer)}
              style={{
                fontSize: "2rem",
                border: "1px solid tomato",
                padding: "10px",
                marginTop: "5px",
              }}
            >
              {customer.name}
            </div>
          ))}
        </div>
      ) : (
        <div style={{ fontSize: "2rem", marginTop: "20px" }}>
          There are no customers
        </div>
      )}
    </div>
  );
}

export default App;
