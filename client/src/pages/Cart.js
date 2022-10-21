import PrimarySearchAppBar from "../components/Appbar";
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import '../components/stylesheets/err.css';
import ButtonGroup from '@mui/material/ButtonGroup';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import Badge from '@mui/material/Badge';
import { useState,useEffect } from "react";

const URL ="http://192.168.1.56:9000";


export const Cart = (props) =>{

    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    console.log(userToken)

    const [len,setLen] = useState(0);
    const [pro,setPro] = useState([]);
    var proList = []
    

    useEffect(() => {
        fetch(URL+"/users/cart/"+userToken)
        .then((res) => res.json())
        .then((data) => {
          console.log("product list")
            console.log(data["response"]["proid"]);
            setLen(data["response"]["proid"].length)
            console.log(len)
            setProducts(data["response"]["proid"])

        });
    }, []);

    async function setProducts(arr){
      
      const count = [];
      var c = 0;
      
      arr.forEach(element => {
        count[element] = (count[element] || 0) + 1;
      });
      
      console.log(count)
      
      for (const property in count) {
        c = c + 1;
        console.log(`${property}: ${count[property]}`);
        var response = await getProDetails(property,count[property])
        if(response == null){
          console.log("response null")
        }else{

          proList.push(response)
          console.log("eresponse")
          console.log(response)
          // console.log(count.length)
          // if(proList.length == count.length){
            
            if(proList.length == c){
              
              setPro(proList)
            }
            
          //}
          

        }
      }

      // console.log(map[1])

      
    
    }

    async function getProDetails(proid,qty){
      
        try {
            let res = await fetch(URL+"/users/which-product/"+proid, {
              method: "POST",
              body: JSON.stringify({
              }),
              headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            });
            let resJson = await res.json();
            if (res.status === 200) {
              
              console.log("form sent")
              console.log(resJson["response"])
              console.log(qty)
              return resJson["response"]
            
            } else {
              console.log("error")
              return null
            }
          } catch (err) {
            console.log(err);
            return null
          }
      
    }


    return(
      <div>
        <PrimarySearchAppBar />
        <div className="center-wrapper">
        <Box sx={{ flexGrow: 1, maxWidth: 752, boxShadow: 2,borderRadius: 2 }}>
          <Typography sx={{margin:2}} variant="h6" component="div">
            Cart
          </Typography>

          <List>
            {pro?(
              <div>
            {pro &&
              pro.map((item) => {

            return <ListItem
              secondaryAction={
                <ButtonGroup
                  disableElevation
                  variant="contained"
                  aria-label="Disabled elevation buttons"
                >

                  <IconButton edge="end" aria-label="edit" >
                    <EditIcon />
                  </IconButton>
                  <IconButton edge="end" aria-label="edit" >
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
                      5
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
                </div>

            ):(
              <p>Loading ... </p>
            )}
          
          </List>

        </Box>
        </div>
      </div>
    )


}