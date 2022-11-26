//this removes the number from the end of piece it is ie bishop1 /bishop2 => bishop
export const removeNumber = (type) => {
  //if the last character is not a number dont change
  if (isNaN(type[type.length - 1])) {
    return type;
  } else {
    //if not remove the last character
    const adjustedType = type.slice(0, type.length - 1);
    return adjustedType;
  }
};
