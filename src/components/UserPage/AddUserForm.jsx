// AddUserForm.js
import React, { useState } from "react";
import css from "./AddUserForm.module.css";
import { useDispatch } from "react-redux";
import { addUser } from "../../slices/UserSlice";

const AddUserForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    photo: "",
  });
  const dispatch = useDispatch();

  // Handle add user
  const handleAddUser = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    dispatch(addUser(formData));
    setFormData({ name: "", photo: "" });
  };

  return (
    <form className={css.form} onSubmit={handleAddUser}>
      <input
        type="text"
        id="name"
        className={css.input}
        placeholder="Enter username.."
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <br />
      <input
        type="url"
        id="photo"
        className={css.input}
        placeholder="Photo URL (Optional)"
        value={formData.photo}
        onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
      />
      <br />
      <button type="submit" className="user_page_button">
        Add User
      </button>
    </form>
  );
};

export default AddUserForm;
