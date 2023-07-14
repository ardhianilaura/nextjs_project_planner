function Navbar() {

    const currentDate = new Intl.DateTimeFormat("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(new Date());
      return (
        <div className="flex flex-col">
          <div className="text-center justify-between my-4">
          <h1 className="text-4xl font-bold text-slate-500">Today's Task</h1>
            <p className="mt-2 text-sm text-center text-slate-500">
                {currentDate}
            </p>
          </div>
        </div>
      );

}

export default Navbar
