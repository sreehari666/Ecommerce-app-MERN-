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



export const ViewProduct = (props) =>{

    const [data, setData] = useState(null);
    const [id,setId] = useState(props.id);

    const [productName,setProductName] = useState(null)
    const [description,setDescription] = useState(null)
    const [imgUrl,setImg] = useState(null)
    const [qty,setQty] = useState(null)

    useEffect(() => {
        fetch("http://192.168.1.43:9000/admin/products")
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
                    <IconButton edge="end" aria-label="edit" onClick={()=>editProduct(item)}>
                      <EditIcon />
                    </IconButton>
                    
                      }
                    >
                      <ListItemAvatar>
                        <Avatar alt="T" src={item.imgUrl} />
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