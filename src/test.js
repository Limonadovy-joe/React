const object = {
  name: "john",
  surname: "Bill",
};
Object.defineProperty(object, "fullName", {
  get() {
    return this.name + this.surname;
  },
});
console.log(object.fullName);
