const MentalHealthPage = () => {
    return ( 
<section className="px-4 py-16">
<div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h2 className="text-3xl font-bold mb-2 flex items-center">
              Mental Health
            </h2>
            <p className="text-muted-foreground">
            Connect with psychology experts and find support for your mental well-being
            </p>
          </div>
          <div className="hidden md:block">{/* This column is intentionally left empty as per the requirements */}</div>
        </div>
  
       
      </div>
</section>
     );
}
 
export default MentalHealthPage;