// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DVideo {
  uint public videoCount = 0;
  string public name = "DVideo";
  mapping(uint => Video) public videos;

  struct Video {
    uint id;
    string hash;
    string title;
    address author;
  }


  //Create Event
  event VideoUploaded(uint id, string hash, string title, address author);

  //Constructor
  constructor() {
  }

  function uploadVideo(string memory _videoHash, string memory _title) public {
    // Make sure the video hash exists

    // Make sure video title exists

    // Make sure uploader address exists


    // Increment video id
    videoCount++;

    // Add video to the contract
    videos[videoCount] = Video(videoCount, _videoHash, _title, msg.sender);

    // Trigger an event
    emit VideoUploaded(videoCount, _videoHash, _title, msg.sender);
  }
}
