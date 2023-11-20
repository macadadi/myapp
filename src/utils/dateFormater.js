export const dateFormart=(dateString)=>{
    const dateObject = new Date(dateString);
    return dateObject.toLocaleDateString();
}