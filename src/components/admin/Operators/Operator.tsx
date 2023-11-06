type User = {
   key: string,
   name: string,
   email: string,
 };

const Operator = (user: User) => {
   return (
      <div className="bg-slate-200 w-full p-2 rounded-md my-2">
         <p>{user.email}</p>
         <p>{user.name}</p>
      </div>
   )
}

export { Operator }