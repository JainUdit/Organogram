import React, { useState, useEffect } from "react";
import { Button, MenuItem } from "@mui/material";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import ListItem from "@mui/material/ListItem";
import { db } from "../../firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

export default function AddNewEmployee({
  open,
  close,
  employeeData,
  setEmployeeData,
}) {
  const [addEmployee, setAddEmployee] = useState({
    name: "",
    empId: "",
    designation: "",
    adminManagerName: "",
    functionalManagerName: "",
    squads: "",
    adminId: "",
    functionId: "",
    adminLevel: "",
    functionLevel: "",
  });

  const usersCollectionRef = collection(db, "employees");
  const getUsers = async () => {
    const userData = await getDocs(usersCollectionRef);
    setEmployeeData(
      userData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    );
  };

  // useEffect(() => {
  //   getUsers();
  // }, []);

  useEffect(() => {
    getAdminUserLevel();
    getAdminId();
    getFunctionalId();
    getFunctionalUserLevel();
  }, [addEmployee.functionalManagerName, addEmployee.adminManagerName]);

  const handleClose = () => {
    setAddEmployee({
      name: "",
      empId: "",
      designation: "",
      adminManagerName: "",
      functionalManagerName: "",
      squads: "",
      adminId: "",
      functionId: "",
      adminLevel: "",
      functionLevel: "",
    });
    close(false);
  };
  const getAdminUserLevel = () => {
    employeeData?.map((val) => {
      if (val.name === addEmployee.adminManagerName)
        setAddEmployee((prev) => ({
          ...prev,
          adminLevel: val.admin.userLevel,
        }));
    });
  };

  const getAdminId = () => {
    employeeData?.map((val) => {
      if (val.name === addEmployee.adminManagerName) {
        setAddEmployee((prev) => ({
          ...prev,
          adminId: val.employeeId,
        }));
      }
    });
  };
  const getFunctionalId = () => {
    employeeData?.map((val) => {
      if (val.name === addEmployee.functionalManagerName) {
        setAddEmployee((prev) => ({
          ...prev,
          functionId: val.employeeId,
        }));
      }
    });
  };
  const getFunctionalUserLevel = () => {
    employeeData?.map((val) => {
      if (val.name === addEmployee.functionalManagerName) {
        setAddEmployee((prev) => ({
          ...prev,
          functionLevel: val.functional.userLevel,
        }));
      }
    });
  };
  const createUser = async () => {
    await addDoc(usersCollectionRef, {
      name: addEmployee.name,
      employeeId: addEmployee.empId,
      designation: addEmployee.designation,
      squad: addEmployee.squads,
      admin: {
        managerId: addEmployee.adminId,
        managerName: addEmployee.adminManagerName,
        userLevel: Number(addEmployee.adminLevel) + 1,
      },
      functional: {
        managerId: addEmployee.functionId,
        managerName: addEmployee.functionalManagerName,
        userLevel: Number(addEmployee.functionLevel) + 1,
      },
    });
    close(false);
  };
  const designations = [
    "Intern",
    "Associate Software Engineer",
    "Software Engineer",
    "Senior Software Engineer",
    "Module Lead",
    "Associate Technical Lead",
    "Technical Lead",
    "Senior Technical Lead",
    "Associate Technical Architect",
    "Technical Architect",
    "Senior Technical Architect",
    "Associate Project Manager",
    "Project Manager",
    "Senior Project Manager",
    "Project Coordinator",
    "Program Manager",
    "Associate Vice President",
    "Vice President",
    "Chief Technical Officer",
    "HR Executive",
    "Assistant HR Manager",
    "HR Manager",
  ];
  const submitHandler = (e) => {
    e.preventDefault();
    createUser();
    close(false);
    setAddEmployee({
      name: "",
      empId: "",
      designation: "",
      adminManagerName: "",
      functionalManagerName: "",
      squads: "",
      adminId: "",
      functionId: "",
      adminLevel: "",
      functionLevel: "",
    });
    getUsers();
  };
  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <form onSubmit={submitHandler}>
          <DialogTitle>Add New Employee</DialogTitle>
          <DialogContent>
            <ListItem>
              <TextField
                autoFocus
                margin="dense"
                id="empId"
                label="Employee Id"
                type="text"
                placeholder="FNPXXXXX"
                variant="standard"
                size="medium"
                fullWidth
                required
                value={addEmployee.empId}
                onChange={(event) => {
                  setAddEmployee((prev) => ({
                    ...prev,
                    empId: event.target.value,
                  }));
                }}
              />
            </ListItem>
            <ListItem>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Name"
                type="text"
                variant="standard"
                size="medium"
                fullWidth
                required
                value={addEmployee.name}
                onChange={(event) => {
                  setAddEmployee((prev) => ({
                    ...prev,
                    name: event.target.value,
                  }));
                }}
              />
            </ListItem>
            <ListItem>
              <TextField
                autoFocus
                margin="dense"
                id="designation"
                label="Designation"
                variant="standard"
                select
                fullWidth
                size="medium"
                required
                value={addEmployee.designation}
                onChange={(event) => {
                  setAddEmployee((prev) => ({
                    ...prev,
                    designation: event.target.value,
                  }));
                }}
              >
                {designations.map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </ListItem>
            <ListItem>
              <TextField
                autoFocus
                margin="dense"
                id="functionalManager"
                label="Functional Manager"
                variant="standard"
                select
                fullWidth
                size="medium"
                required
                value={addEmployee.functionalManagerName}
                onChange={(event) => {
                  setAddEmployee((prev) => ({
                    ...prev,
                    functionalManagerName: event.target.value,
                  }));
                }}
              >
                {employeeData?.map((option) => (
                  <MenuItem key={option.id} value={option.name}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            </ListItem>
            <ListItem>
              <TextField
                autoFocus
                margin="dense"
                id="adminManager"
                label="Administrative Manager"
                variant="standard"
                select
                fullWidth
                size="medium"
                required
                value={addEmployee.adminManagerName}
                onChange={(event) => {
                  setAddEmployee((prev) => ({
                    ...prev,
                    adminManagerName: event.target.value,
                  }));
                }}
              >
                {employeeData?.map((option) => (
                  <MenuItem key={option.id} value={option.name}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            </ListItem>
            <ListItem>
              <TextField
                autoFocus
                margin="dense"
                id="squad"
                label="Squads"
                variant="standard"
                size="medium"
                fullWidth
                required
                value={addEmployee.squads}
                onChange={(event) => {
                  setAddEmployee((prev) => ({
                    ...prev,
                    squads: event.target.value,
                  }));
                }}
              ></TextField>
            </ListItem>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Submit</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
