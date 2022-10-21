import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import AdminAppBar from '../../components/adminAppbar';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import { useState,useEffect } from "react";
import '../../components/stylesheets/err.css';
import {WhisperSpinner} from "../../components/Loading";
import {AdminEditProduct} from "./EditProduct";
import Badge from '@mui/material/Badge';

import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import {useNavigate} from "react-router-dom";

const URL ="http://192.168.1.56:9000";


export const ViewProduct = (props) =>{

   const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [id,setId] = useState(props.id);

    const [productName,setProductName] = useState(null)
    const [description,setDescription] = useState(null)
    const [imgUrl,setImg] = useState(null)
    const [qty,setQty] = useState(null)

    useEffect(() => {
        fetch(URL+"/admin/products")
        .then((res) => res.json())
        .then((data) => {
            console.log(data['response']);
            setData(data['response']);
            // setId(null);
        });
    }, []);
    function editProduct(item) {
      setId(item._id)
      setProductName(item.productName);
      setDescription(item.description)
      setImg(item.imgUrl);
      setQty(item.qty);
      return <AdminEditProduct id={id} productName={productName} description={description} imgUrl={imgUrl} qty={qty} />
    }
    
    async function deleteProduct(item){
      console.log(item)
      let confirmAction = confirm("Are you sure to delete this item ?");
        if (confirmAction) {

          try{
            let res = await fetch(URL+"/admin/delete-product/"+item._id, {
              method: "POST",
              body: JSON.stringify({
              }),
              headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            });

            console.log(res)
            let resJson = await res.json();
            console.log(resJson)
            
            if (resJson.status === true) {
              
              
              console.log("form sent")
              window.location.reload();
              // navigate("/admin-view-product")
              
    
            } else {
              console.log("error")
            }
          } catch (err) {
            console.log(err);
          }

        } 
    }


    return(
        <div >
        <AdminAppBar/>
        <div className='center-wrapper'>
        {id?(
          <AdminEditProduct id={id} productName={productName} description={description} imgUrl={imgUrl} qty={qty} />
        ):(
          <Box sx={{ flexGrow: 1, maxWidth: 752, boxShadow: 2,borderRadius: 2 }}>
          <Typography sx={{margin:2}} variant="h6" component="div">
             Products
            </Typography>
            
              <List >
                
              {data?(
                  <div>
                  
                  {data &&
                  data.map((item) => {
                  return <ListItem
                  secondaryAction={
                    <ButtonGroup
                      disableElevation
                      variant="contained"
                      aria-label="Disabled elevation buttons"
                    >

                      <IconButton edge="end" aria-label="edit" onClick={()=>editProduct(item)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton edge="end" aria-label="edit" onClick={()=>deleteProduct(item)}>
                        <DeleteIcon />
                      </IconButton>

                    </ButtonGroup>
                      }
                    >
                      <ListItemAvatar>

                      <Badge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        badgeContent={
                          item.qty
                          // <Avatar alt="qty" src={item.qty} />
                        }
                      >
                        <Avatar alt="P" src={item.imgUrl} />
                      </Badge>
                        {/* <Avatar alt="T" src={item.imgUrl} /> */}
                      </ListItemAvatar>
                      <ListItemText
                          primary={item.productName}
                          secondary={item.description}
                        />
                      </ListItem>
                      })}
                       <Divider />
              </div>
                  
              ):(
                  <div className='loader-wrapper'>
                      <WhisperSpinner size={50} frontColor="#5E35B1" backColor="#B39DDB" />
                  </div>
              )}
                 
              </List>
             
              </Box>
        )}
        
            </div>
          
        </div>
    )

}