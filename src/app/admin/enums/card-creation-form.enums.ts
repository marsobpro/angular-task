export enum ControlNames {
  TITLE = 'title',
  DESCRIPTION = 'description',
  IMAGE_LINK = 'imageLink',
  VIDEO_LINK = 'videoLink',
  CREATION_DATE = 'creationDate',
  TAGS = 'tags',
}

export enum ErrorMessages {
  REQUIRED_TITLE = 'Please enter a title',
  MIN_LENGTH_TITLE = 'The title must be at least 3 characters long',
  MAX_LENGTH_TITLE = 'The title must be no more than 20 characters long',
  MAX_LENGTH_DESCRIPTION = 'The description must be no more than 255 characters long',
  REQUIRED_IMAGE_LINK = 'Please enter a link to the image',
  INVALID_IMAGE_LINK = 'Image link must be a valid URL.',
  REQUIRED_VIDEO_LINK = 'Please enter a link to the video',
  INVALID_VIDEO_LINK = 'Video link must be a valid URL.',
  REQUIRED_CREATION_DATE = 'Please enter a creation date',
  DATE_TOO_EARLY = 'Creation date cannot be earlier than {minDate}.',
  DATE_IN_FUTURE = 'The creation date cannot be in the future',
  REQUIRED_TAG = 'Tag is required',
  TAG_INVALID = 'Tag must start with #',
}
