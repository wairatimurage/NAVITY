const path = require("path");
const fs = require("fs");

const { tinifyImage } = require("./tinify");
const { deleteFile, uploadFile } = require("./s3Actions");
const { handleServerErrors } = require("./errorHandling");

const updateProfileResponse = (_profile, _host) => {
  let _new = _profile.toJSON();
  if (process.env.NODE_ENV === "development" && _new.avatar) {
    _new.avatar = _host + _new.avatar;
  }

  delete _new._id;
  delete _new.__v;
  return _new;
};

const updateImages = async (_avatar, _id, host, storageCategory) => {
  let _newAvatar = _avatar;
  if (
    _avatar &&
    _avatar.split("base64").length === 2 &&
    _avatar.split("://").length !== 2
  ) {
    const imageName = _id + "-" + ".png";
    const baseString = _avatar.split("base64,").slice(-1).toString();
    if (process.env.NODE_ENV === "development") {
      await tinifyImage(
        baseString,
        path.join(__dirname, `../images/${imageName}`)
      );
      _newAvatar = imageName;
    } else {
      // eslint-disable-next-line no-unused-vars
      const _location = await uploadFile(
        baseString,
        storageCategory + "/" + imageName
      );

      _newAvatar = process.env.BUCKET_LINK + storageCategory + "/" + imageName;
    }
  }

  if (
    process.env.NODE_ENV === "development" &&
    _avatar.split("://").length > 1
  ) {
    _newAvatar = _avatar.replace(host, "");
  }

  return _newAvatar;
};

const deleteImages = async (_avatar, _host) => {
  try {
    let _newAvatar = _avatar;
    if (process.env.NODE_ENV === "development") {
      _newAvatar = _avatar.replace(_host, "");
      const imagePath = path.join(__dirname, "../images/" + _newAvatar);
      fs.unlinkSync(imagePath);
    } else {
      _newAvatar = _avatar.replace(process.env.BUCKET_LINK, "");
      await deleteFile();
    }

    // TODO: s3 delete
  } catch (_err) {
    handleServerErrors(_err);
  }
};

module.exports = {
  updateImages,
  updateProfileResponse,
  deleteImages,
};
