const Url_Channel =
  "http://moa.aveapp.com:21405/file/api/down_proc.jsp?type=7&serverfile=";

export const getImageChannel = (imageName: string) => {
  if (imageName.length > 0) {
    return Url_Channel + imageName;
  } else {
    return "https://cdn-icons-png.flaticon.com/512/5675/5675392.png"; //default room image
  }
};

export const getImageUser = (userId: string, roomId: string) => {
  return `http://moa.aveapp.com:21405/file/api/down_proc.jsp?type=12&userid=${userId}&roomid=${roomId}`;
};
