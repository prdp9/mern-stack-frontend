import React, { useState } from "react";

const Form = () => {
  //   const [fullName, setFullName] = useState("");
  //   const [address, setAddress] = useState("");
  //   const [school, setSchool] = useState("");
  //   const [isAdult, setIsAdult] = useState("");
  //   const [age, setAge] = useState("");

  const [user, setUser] = useState({
    fullName: "",
    address: "",
    school: "",
    isAdult: "",
    age: "",
  });

  const handleChange = (e) => {
    const { value, name, type, checked } = e.target;
    console.log(name, value, type, checked);

    type === "checkbox"
      ? setUser((prev) => {
          return {
            ...prev,
            [name]: checked,
          };
        })
      : setUser((prev) => {
          return {
            ...prev,
            [name]: value,
          };
        });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit btn triggered", user);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Full Name: {user.fullName}</h2>
        <h2>Address: {user.address}</h2>
        <h2>is Adult: {user.isAdult ? "True" : "False"}</h2>
        <h2>Age: {user.age}</h2>

        <input
          name="fullName"
          type="text"
          placeholder="Enter your name"
          value={user.fullName}
          onChange={handleChange}
        />
        <input
          name="address"
          type="text"
          placeholder="Enter your address"
          value={user.address}
          onChange={handleChange}
        />
        <input
          name="school"
          type="text"
          placeholder="Enter your school"
          value={user.school}
          onChange={handleChange}
        />
        <input
          name="age"
          type="text"
          placeholder="Enter your age"
          value={user.age}
          onChange={handleChange}
        />
        <input
          type="checkbox"
          name="isAdult"
          checked={user.isAdult}
          onChange={handleChange}
        />
        <button>Submit</button>
      </form>
    </>
  );
};

export default Form;
