import React, { useState, useEffect, useRef } from "react";
import { Button, Form } from "react-bootstrap";
import { FileUploader } from "react-drag-drop-files";
import { CSSTransition } from "react-transition-group";

function NavMenu(props) {
  const [activeMenu, setActiveMenu] = useState("main");
  const [menuHeight, setMenuHeight] = useState(null);
  const dropdownRef = useRef(null);
  const [classType, setClassType] = useState("");

  const [file, setFile] = useState(null);
  const handleChange = (file) => {
    setFile(file);
  };

  const imageExtensions = ["JPEG", "PNG", "GIF"];

  const audioExtensions = ["MP3"];

  const handleMiddleShift = (direction) => {
    direction == "back"
      ? setClassType("menu-primary")
      : setClassType("menuSecondary");
  };

  useEffect(() => {
    const height = dropdownRef.current?.firstChild.offsetHeight;
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight);
  }, []);

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  function DropdownItem(props) {
    return (
      <a
        href={props.href}
        className="menu-item"
        onClick={() => {
          if (props.goToMenu == "main") {
            setClassType("menu-secondary", setActiveMenu(props.goToMenu));
          } else if (props.toThirdMenu) {
            console.log("here");
            setClassType("menu-primary", setActiveMenu(props.goToMenu));
          } else {
            props.goToMenu && setActiveMenu(props.goToMenu);
          }
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
          <Form.Control
            placeholder="Type you message..."
            as="textarea"
            rows={12}
            className="fontMontserrat"
          />
          <Form.Control className="mt-3 fontMontserrat" placeholder="Name" type="text" />
          <Form.Control className="mt-3 fontMontserrat" placeholder="Location" type="text" />
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
          <Form.Control className="mt-3 fontMontserrat" placeholder="Name" type="text" />
          <Form.Control className="mt-3 fontMontserrat" placeholder="Location" type="text" />
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
          <Form.Control className="mt-3 fontMontserrat" placeholder="Name" type="text" />
          <Form.Control className="mt-3 fontMontserrat" placeholder="Location" type="text" />
        </div>
      </CSSTransition>
    </div>
  );
}

export default NavMenu;
