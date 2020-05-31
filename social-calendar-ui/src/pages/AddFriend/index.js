import React, {useState, useEffect, useContext} from "react";
import UserContext from "../../UserContext";
import isLoggedIn from "../../utils/isLoggedIn"; // will redirect if user is not logged in


function AddFriend(props) {

  const {user, setUser} = useContext(UserContext);
  
  const [friend, setFriend] = useState("");

  // make api calls to see users that match the search (run on mount)
  useEffect(() => {
    isLoggedIn(user,setUser, props, () => {
      fetch("/api/user-search/" + friend)
      .then(response => response.json())
      .then(data => {
        setUsers(data)
      })
    }) 
  }, []);


  // effect runs when friends state changes
  useEffect(() => {
    // call api with friends value
  }, [friends])

  return (
    <div className="body"> 
      <form onSubmit={(e) => {e.preventDefault()}}>
        <label htmlFor="search-user"></label>
        <input type="text" id="search-user" value={friend} onChange={(e) => {setFriend(e.target.value)}}/>
      </form>



      <p>{friend}</p>
    </div>
  )
}


export default AddFriend;