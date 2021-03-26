import * as React from "react";
import Button from "@material-ui/core/Button";
import './App.css';
import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
  GridCellParams,
  GridApi
} from "@material-ui/data-grid";
import { useHistory } from "react-router-dom";



 //const rows = getToDoItems();




export default function Listpage() {

  const history = useHistory();

  const columns: GridColDef[] = [
    { field: "id", headerName: "", width: 0, disableColumnMenu: true, hide: true},
    { field: "full_name", headerName: "Full name", width: 200 },
    { field: "email", headerName: "Email", width: 300 },
    { field: "country", headerName: "Country", width: 160 },
    { field: "city", headerName: "City", width: 200 },
    { disableColumnMenu: true,
      field: "",
      
      headerName: "Details",
      sortable: false,
      width: 100,
      disableClickEventBubbling: true,
      renderCell: (params: GridCellParams) => {
        const onClick = () => {
          const api: GridApi = params.api;
          const fields = api
            .getAllColumns()
            .map((c) => c.field)
            .filter((c) => c !== "__check__" && !!c);
          type thisrowtype = {
              [index: string]:any;
          }
          const thisRow = {} as thisrowtype;
  
           fields.forEach((f) => {
               thisRow[f] = params.getValue(f);
           });


          history.push(`/details/${thisRow.id}`)
          //return alert(JSON.stringify(thisRow.id, null, 4));
        };
  
        return <Button onClick={onClick} color='primary' className="detailButton"><span  className="detailButtonText">&#8594;</span></Button>;
  
      }
    }
    
  ];
  
  const getToDoItems = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_TO_DO_ITEMS_API}/employees`
      );
      const items = await response.json();
      console.log(items)
    };
  

  const [toDoItems, updateToDoItems] = React.useState([]);
  const [buttonLabel, updateButtonLabel] = React.useState('Reset Employees');

  const onClick= async () => {
    updateButtonLabel('Loading...')
    resetItems()
  }

  const resetItems = async () => {
    //console.log('ran')
    const response = await fetch(
      `${process.env.REACT_APP_TO_DO_ITEMS_API}/newemployees`,
      {method: 'POST'}
    )
    const items = await response.json();
    //console.log(items)
    if (items && Array.isArray(items) && items.length) {
      // @ts-ignore
      updateToDoItems(items);
      updateButtonLabel('Reset Employees')
    }
  };
  

  const getToDoItemsTwo = async (field: any, sort: any) => {
    //console.log('ran')
    const response = await fetch(
      `${process.env.REACT_APP_TO_DO_ITEMS_API}/employees`,
      {method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({"column":field,"order":sort})}
    );
    const items = await response.json();
    //console.log(items)
    if (items && Array.isArray(items) && items.length) {
      // @ts-ignore
      updateToDoItems(items);
      
    }
  };

  const handleSortModelChange = (params: any) => {

      if(Object.keys(params.sortModel).length===0) {
        const field = "id"
        const sort = "asc"
        getToDoItemsTwo(field, sort)
      } else {
        const field = params.sortModel[0].field
        const sort = params.sortModel[0].sort
        getToDoItemsTwo(field, sort)
      }

    }


  React.useEffect(() => {
    const getToDoItems = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_TO_DO_ITEMS_API}/employees`
      );

      const items = await response.json();
      if (items && Array.isArray(items) && items.length) {
        // @ts-ignore
        updateToDoItems(items);
      }
    };
    getToDoItems();

  }, []);

  return (
    <div className='fullList' style={{ height: "100vh", width: "1000px"}}>

          <div className='bottomRow'/>
          
          <div>
            <div />
            <Button variant="contained" color="secondary" onClick={onClick} className='resetButton'>
              {buttonLabel}
            </Button>
            <div />
          </div>
          <div className='middleRow'/>
          <DataGrid rows={toDoItems} columns={columns} pageSize={100} sortingMode="server" onSortModelChange={handleSortModelChange} rowHeight={25} />
          <div className='largeMiddleRow'/>
          <div>
            <div />
              <div className="title">
              Employees
              </div>
            <div />
          </div>
          <div className='topRow'/>
    </div>
    
  );
}
