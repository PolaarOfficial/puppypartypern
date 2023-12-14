"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var logo_svg_1 = require("./logo.svg");
require("./App.css");
var axios_1 = require("axios");
var react_1 = require("react");
require("bootstrap/dist/css/bootstrap.min.css");
function App() {
    var _a = (0, react_1.useState)([]), data = _a[0], setData = _a[1];
    (0, react_1.useEffect)(function () {
        axios_1.default.get('/notifications').then(function (res) { return res.data; }).then(function (data) { return setData(data); });
    }, []);
    return (<div className='container my-5' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <table className='table table-striped'>
        <thead>
          <tr>
            <th>ID</th>
            <th>PUP ID</th>
            <th>TYPE OF REQUEST</th>
            <th>FRIEND REQUEST ID</th>
            <th>PARTY REQUEST ID</th>
            <th>TIME CREATED</th>
          </tr>
        </thead>
          <tbody>
            {data.map(function (item) { return (<tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.pup_id}</td>
                <td>{item.type_of_request}</td>
                <td>{item.friend_request_id}</td>
                <td>{item.party_request_id}</td>
                <td>{item.time_created}</td>
              </tr>); })}
          </tbody>
        </table> 
      </div>);
}
exports.default = App;
