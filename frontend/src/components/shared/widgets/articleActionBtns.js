import React, { useEffect, useState } from "react";

export const ArticleActionButtons = ({ idea, ...props }) => {
  const [loadingStar, setLoadingStar] = useState(false);
  const [loadingBookmark, setLoadingBookmark] = useState(false);
  const shareArticle = (event) => {
    event.target.dataset.target = "#share-modal";
    toggleModal(event);
  };
  const starArticle = (event) => {
    event.preventDefault();
    const _selectItem = idea;
    let _requestStarred;
    setLoadingStar(true);

    if (props.profile) {
      if (
        props.profile.starred &&
        props.profile.starred.find((_item) => _item.id === _selectItem.id)
      ) {
        _requestStarred = props.profile.starred;
        const _deleteIndex = _requestStarred.findIndex(
          (_item) => _item.id === _selectItem.id
        );
        _requestStarred.splice(_deleteIndex, 1);
      } else {
        _requestStarred = [...props.profile.starred, _selectItem];
      }
      setLoadingStar(false);
      editUserDetails({
        id: props.profile.id,
        starred: _requestStarred,
        flag: "starring",
      })
        .then((_data) => {
          setLoadingStar(false);
          if (_data.errorMessage) {
            showToast({ message: _data.errorMessage, _class: "error" });
            return;
          }
          props.loadIdeas();
          props.loadProfile();
        })
        .catch((_err) => {
          console.log(_err);
          showToast({
            message: "Sorry an error occured. Please try again.",
            _class: "error",
          });
        });
      return;
    }
    setLoadingStar(false);
    loginRequiredModal(event);
  };
  const bookmarkArticle = (event) => {
    event.preventDefault();
    const _selectItem = idea;
    let _requestBookmarks;
    setLoadingBookmark(true);
    if (props.profile) {
      if (
        props.profile.bookmarks &&
        props.profile.bookmarks.find((_item) => _item.id === _selectItem.id)
      ) {
        _requestBookmarks = props.profile.bookmarks;
        const _deleteIndex = _requestBookmarks.findIndex(
          (_item) => _item.id === _selectItem.id
        );
        _requestBookmarks.splice(_deleteIndex, 1);
      } else {
        _requestBookmarks = [...props.profile.bookmarks, _selectItem];
      }
      setLoadingBookmark(false);
      editUserDetails({
        id: props.profile.id,
        bookmarks: _requestBookmarks,
        flag: "bookmarking",
      })
        .then((_data) => {
          setLoadingBookmark(false);
          if (_data.errorMessage) {
            showToast({ message: _data.errorMessage, _class: "error" });
            return;
          }
          showToast({
            message: "Bookmarks Successfully updated.",
            _class: "success",
          });
          props.loadProfile();
        })
        .catch((_err) =>
          showToast({
            message: "Sorry an error occured. Please try again.",
            _class: "error",
          })
        );
      return;
    }
    loginRequiredModal(event);
    setLoadingBookmark(false);
  };
  const highlightAction = (_id, _list) => {
    return (
      props.profile &&
      props.profile[_list] &&
      props.profile[_list].find((elem) => _id === elem.id)
    );
  };
  return (
    <div className="article-action-buttons">
      <button className="btn" onClick={bookmarkArticle}>
        {!loadingBookmark ? (
          <svg
            fill={
              highlightAction(idea.id, "bookmarks") ? "var(--orange)" : "none"
            }
            stroke="var(--orange)"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1"
              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
            ></path>
          </svg>
        ) : (
          <DualRingSpinner />
        )}
      </button>
      <button className="btn" onClick={starArticle}>
        {!loadingStar ? (
          <div className="article-stars-container">
            <svg
              fill={
                highlightAction(idea.id, "starred") ? "var(--gold)" : "none"
              }
              stroke="var(--gold)"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              ></path>
            </svg>
            <span>{idea.stars || "0"}</span>
          </div>
        ) : (
          <LoadingStar />
        )}
      </button>
      <button className="btn" onClick={shareArticle}>
        <svg
          fill="none"
          stroke="var(--orange)"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
          ></path>
        </svg>
      </button>
    </div>
  );
};
