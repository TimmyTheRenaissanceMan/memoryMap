import React, { useState, useEffect, useRef } from "react";
import { Button, Form } from "react-bootstrap";
import { FileUploader } from "react-drag-drop-files";
import { CSSTransition } from "react-transition-group";
import store from "../../store";

function NavMenu(props) {
  const [activeMenu, setActiveMenu] = useState("main");
  const [menuHeight, setMenuHeight] = useState(null);
  const dropdownRef = useRef(null);

  const [file, setFile] = useState(null);
  const handleChange = (file) => {
    setFile(file);
  };

  //   Image extensions for FileUploader
  const imageExtensions = ["JPEG", "PNG", "GIF"];

  //   Audio extensions for FileUploader
  const audioExtensions = ["MP3"];

  useEffect(() => {
    const height = dropdownRef.current?.firstChild.offsetHeight;
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight);
  }, []);

  //   Menu styling adjustment
  const calcHeight = (el) => {
    const height = el.offsetHeight;
    setMenuHeight(height);
  };

  //  Send data to the server
  const submitData = async (form, type) => {
    form.preventDefault();
    setActiveMenu("main");
    props.closeNav();
    const textInput = {
      message: type === "text" ? form.target[0].value : "",
      name: type === "text" ? form.target[1].value : form.target[0].value,
      location: type === "text" ? form.target[2].value : form.target[1].value,
      type: type,
      lat: store.getState().marker.lat,
      lng: store.getState().marker.lng,
    };
    const request = new FormData();
    if (type !== "text") {
      request.append("file", file[0]);
    }
    const response = await fetch("/api/marker", {
      method: "POST",
      headers: {
        Accept: "application/json",
        data: JSON.stringify({ textInput }),
      },
      body: request,
    });
    const data = await response.json();
    // Delete new marker from store
    // Pass marker data to maps and push to all markers
    if (data) {
      store.dispatch({
        type: "addMarkerToAll",
        payload: {
          ...textInput,
          image: type === "image" ? true : false,
          audio: type === "audio" ? true : false,
          _id: data._id,
        },
      });
      store.dispatch({
        type: "saveMarker",
        payload: {
          lat: 0,
          lng: 0,
        },
      });
    }
  };

  function DropdownItem(props) {
    return (
      <a
        href={props.href}
        className="menu-item"
        onClick={() => {
          props.goToMenu && setActiveMenu(props.goToMenu);
        }}
      >
        <span className="icon-button">{props.leftIcon}</span>
        {props.children}
        <span className="icon-right">{props.rightIcon}</span>
      </a>
    );
  }

  return (
    <div
      className="dropdown fontPassionOne"
      style={{ height: menuHeight }}
      ref={dropdownRef}
    >
      <CSSTransition
        in={activeMenu === "main"}
        timeout={500}
        classNames="menu-primary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="menu">
          <p className="fs26 fontPassionOne text-start">Add a Pin</p>
          <a className="closebtn" onClick={props.closeNav}>
            &times;
          </a>
          <DropdownItem goToMenu="addText">
            <Button className="menuButton">Add Text</Button>
          </DropdownItem>

          <DropdownItem goToMenu="addImage">
            <Button className="menuButton">Add Image</Button>
          </DropdownItem>

          <DropdownItem goToMenu="addAudio">
            <Button className="menuButton">Add Audio</Button>
          </DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === "addText"}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownItem goToMenu="main">
            <p className="fs26 fontPassionOne text-start menuBackButton">
              <span className="fontMath me-3">{"<"}</span>Add Text
            </p>
          </DropdownItem>
          <Form onSubmit={(e) => submitData(e, "text")}>
            <Form.Control
              placeholder="Type you message..."
              as="textarea"
              rows={12}
              className="fontMontserrat"
            />
            <Form.Control
              className="mt-3 fontMontserrat"
              placeholder="Name"
              type="text"
            />
            <Form.Control
              className="mt-3 fontMontserrat"
              placeholder="Location"
              type="text"
            />
            <Button type="submit" className="menuButton mt-3">
              Submit
            </Button>
          </Form>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === "addImage"}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownItem goToMenu="main">
            <p className="fs26 fontPassionOne text-start menuBackButton">
              <span className="fontMath me-3">{"<"}</span>Add Image
            </p>
          </DropdownItem>
          <div className="mt-3">
            <FileUploader
              multiple={true}
              handleChange={handleChange}
              name="file"
              types={imageExtensions}
            />
            <p>
              {file ? `File name: ${file[0].name}` : "no files uploaded yet"}
            </p>
          </div>
          <Form onSubmit={(e) => submitData(e, "image")}>
            <Form.Control
              className="mt-3 fontMontserrat"
              placeholder="Name"
              type="text"
            />
            <Form.Control
              className="mt-3 fontMontserrat"
              placeholder="Location"
              type="text"
            />
            <Button type="submit" className="menuButton mt-3">
              Submit
            </Button>
          </Form>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === "addAudio"}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownItem goToMenu="main">
            <p className="fs26 fontPassionOne text-start menuBackButton">
              <span className="fontMath me-3">{"<"}</span>Add Audio
            </p>
          </DropdownItem>
          <div className="mt-3">
            <FileUploader
              multiple={true}
              handleChange={handleChange}
              name="file"
              types={audioExtensions}
            />
            <p>
              {file ? `File name: ${file[0].name}` : "no files uploaded yet"}
            </p>
          </div>
          <Form onSubmit={(e) => submitData(e, "audio")}>
            <Form.Control
              className="mt-3 fontMontserrat"
              placeholder="Name"
              type="text"
            />
            <Form.Control
              className="mt-3 fontMontserrat"
              placeholder="Location"
              type="text"
            />
            <Button type="submit" className="menuButton mt-3">
              Submit
            </Button>
          </Form>
        </div>
      </CSSTransition>
    </div>
  );
}

export default NavMenu;
