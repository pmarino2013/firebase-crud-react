import AddBook from "./components/AddBook";

function App() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-md-6 offset-md-3">
          <h1>Lista de LIbros</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-6 offset-md-3">
          <AddBook />
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-6 offset-md-3"></div>
      </div>
    </div>
  );
}

export default App;
