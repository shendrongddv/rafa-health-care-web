const ExercisePage = () => {
    return ( 
<section className="px-4 py-16">
<div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h2 className="text-3xl font-bold mb-2 flex items-center">
              Exercise
            </h2>
            <p className="text-muted-foreground">
            Track your physical activities and stay in shape
            </p>
          </div>
          <div className="hidden md:block">{/* This column is intentionally left empty as per the requirements */}</div>
        </div>
  
       
      </div>
</section>
     );
}
 
export default ExercisePage;