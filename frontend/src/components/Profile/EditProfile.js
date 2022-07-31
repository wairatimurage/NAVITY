import React, { useState, useEffect } from "react";
import Proptypes from "prop-types";
import { editProfile, fetchProfile } from "../../utility/apiCalls";
import TextInput from "../shared/widgets/TextInput";
import EditList from "../shared/widgets/EditList";
// import { Link } from "react-router-dom";

const EditProfile = ({ location, history }) => {
  const [user, setUser] = useState({
    bio: {},
    socials: { instagram: "", twitter: "", linkedIn: "" },
  });
  const [updateable, setUpdateable] = useState(false);
  const [loadState, setLoadState] = useState(false);
  const fetchArguments = location.pathname.split("/");

  useEffect(() => {
    fetchProfile(fetchArguments[2], fetchArguments[4]).then((data) => {
      setUser({ ...user, ...data });
      setLoadState(true);
    });
  }, []);

  const handleImageUpload = (event) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      setUser({
        ...user,
        [event.target.name]: reader.result,
      });
    };
    console.log("user: ", user.avatar);
    console.log("reader: ", reader.result);
    setUpdateable(true);
  };

  const handleInputChange = (event) => {
    event.preventDefault();
    setUser({ ...user, [event.target.name]: event.target.value });
  };
  const handleNestedInputChange = (event) => {
    const [group, ...name] = event.target.name.split(" ");
    if (event.target.type === "textarea" || event.target.type === "url") {
      setUser({
        ...user,
        [group]: { ...user[group], [name.join(" ")]: event.target.value },
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    editProfile(fetchArguments[2], fetchArguments[4], user)
      .then(() => history.goBack())
      .catch((err) => console.log(err));
  };
  const cancelEdit = (event) => {
    event.preventDefault();
    // TODO: check if state has changed
    history.goBack();
    return;
  };
  return (
    <>
      {loadState ? (
        <section className="container-fluid">
          {/* <div className="container-fluid"><h2>Edit Profile</h2></div> */}
          <div className="container-fluid profile-edit">
            <form className="personal-details container">
              <p className="profile-edit-section-title">Basic Information</p>
              {user.avatar ? (
                <img
                  id="my-account-avatar"
                  src={user.avatar}
                  alt=""
                  name="avatar"
                />
              ) : (
                <div className="avatar-upload-container">
                  <input
                    type="file"
                    name="avatar"
                    id="avatar"
                    onChange={handleImageUpload}
                    accept="image/png, image/jpeg"
                    hidden
                    className="avatar-upload"
                  />
                  <label htmlFor="avatar" id="my-account-avatar">
                    <svg
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"></path>
                    </svg>
                  </label>
                </div>
              )}

              <TextInput
                name="name"
                label="Name:"
                value={user.name || ""}
                onChange={handleInputChange}
              />
              <TextInput
                name="email"
                label="Email:"
                value={user.email || ""}
                onChange={handleInputChange}
              />
              {user.accountType === "insititution" ? (
                <TextInput
                  name="telephone"
                  type="tel"
                  label="Mobile: "
                  value={user.telephone
                    .map((_telephone) => _telephone)
                    .toString()}
                  onChange={handleInputChange}
                />
              ) : (
                <TextInput
                  name="telephone"
                  type="tel"
                  label="Mobile: "
                  value={user.telephone || ""}
                  onChange={handleInputChange}
                />
              )}
              {user.accountType === "pilot" ? (
                <TextInput
                  name="location"
                  type="tel"
                  label="Location: "
                  value={user.location || ""}
                  onChange={handleInputChange}
                />
              ) : (
                <TextInput
                  name="location"
                  type="tel"
                  label="Location: "
                  value={user.locations
                    .map((_telephone) => _telephone)
                    .toString()}
                  onChange={handleInputChange}
                />
              )}
            </form>
            <form className="container">
              <p className="profile-edit-section-title">Bio</p>
              <div className="form-group">
                <label htmlFor="bio description">Summary:</label>
                <textarea
                  className="form-control"
                  name="bio description"
                  value={user.bio.description}
                  onChange={handleNestedInputChange}
                  style={{
                    width: "90%",
                    resize: "none",
                    overflow: "auto",
                    fontFamily: "inherit",
                  }}
                  rows="6"
                ></textarea>
              </div>
              {user.accountType === "institution" ? (
                <>
                  <EditList
                    name="bio services"
                    label="Services:"
                    list={user.bio.services}
                    user={user}
                    setUser={setUser}
                  />
                </>
              ) : (
                <>
                  <EditList
                    name="bio services"
                    label="Services:"
                    list={user.bio.services}
                    user={user}
                    setUser={setUser}
                  />
                  <EditList
                    name="bio dronesFlown"
                    label="Drones Flown:"
                    list={user.bio.dronesFlown}
                    user={user}
                    setUser={setUser}
                  />
                  <EditList
                    name="bio rating"
                    label="Rating:"
                    list={user.bio.rating}
                    user={user}
                    setUser={setUser}
                  />
                </>
              )}
            </form>
            <form className="container">
              <p className="profile-edit-section-title">Socials</p>
              <TextInput
                name="socials instagram"
                type="url"
                label="Instagram:"
                onChange={handleNestedInputChange}
                placeholder="www.example.com"
                value={user.socials.instagram || ""}
              />
              <TextInput
                name="socials linkedIn"
                type="url"
                label="LinkedIn:"
                placeholder="www.example.com"
                onChange={handleNestedInputChange}
                value={user.socials.linkedIn || ""}
              />
              <TextInput
                name="socials twitter"
                type="url"
                label="Twitter:"
                placeholder="www.example.com"
                onChange={handleNestedInputChange}
                value={user.socials.twitter || ""}
              />
              <TextInput
                name="website"
                type="url"
                placeholder="www.example.com"
                label="Website:"
                onChange={handleInputChange}
                value={user.website || ""}
              />
            </form>
            <div
              className="container"
              style={{
                display: "flex",
                justifyContent: "flex-end",
                margin: "1rem 0 2rem",
              }}
            >
              <button className="btn bg-gray" onClick={cancelEdit}>
                Cancel
              </button>
              <button className="btn bg-primary" onClick={handleSubmit}>
                Save Changes
              </button>
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
};

EditProfile.propTypes = {
  location: Proptypes.object,
  history: Proptypes.object,
};

export default EditProfile;
