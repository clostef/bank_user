import { useSelector, useDispatch } from "react-redux";
import "./style.css";
import { useState } from "react";
import { setUser } from "../../../store/userSlice";

const EditUser = ({ onClose }) => {
  const user = useSelector((state) => state.user.infos);
  const token = useSelector((state) => state.user.token);
  const [editedUserName, setEditedUserName] = useState(user.userName);
  const dispatch = useDispatch();

  const handleCancelClick = (event) => {
    event.preventDefault();
    onClose();
  };
  const handleSaveClick = async (event) => {
    event.preventDefault();

    if (!editedUserName) {
      alert("entrez un pseudo");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:3001/api/v1/user/profile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ userName: editedUserName }),
        }
      );

      if (!response.ok) {
        alert("l'utilisateur n'a pas été trouvé");
        return;
      }

      const editResponse = await response.json();

      dispatch(setUser({ ...user, userName: editedUserName }));

      alert("username sauvegardé");
      onClose();
    } catch (e) {}
  };

  const handleUserNameChange = (event) => {
    setEditedUserName(event.target.value);
  };

  return (
    <form>
      <h2>Edit user infos</h2>
      <div className="line-edit">
        <label htmlFor="fname">User name:</label>
        <input
          type="text"
          id="fname"
          name="fname"
          value={editedUserName}
          onChange={handleUserNameChange}
        />
      </div>
      <div className="line-edit">
        <label htmlFor="lname">First name:</label>
        <input
          type="text"
          id="lname"
          name="lname"
          value={user.firstName}
          disabled
        />
      </div>
      <div className="line-edit">
        <label htmlFor="lname">Last name:</label>
        <input
          type="text"
          id="lname"
          name="lname"
          value={user.lastName}
          disabled
        />
      </div>
      <div className="actions-edit">
        <button className="edit-button" type="submit" onClick={handleSaveClick}>
          Save
        </button>
        <button className="edit-button" onClick={handleCancelClick}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditUser;
