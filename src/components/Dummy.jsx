import React from 'react';



const Dummy = () => {
    return (
      <>
  
        <main className="flex-1 w-full flex flex-col items-center">
          <section className="w-full flex justify-center py-16 bg-gray-100">
            <div className="max-w-7xl w-full flex flex-col items-center px-12">
              <h1 className="text-4xl font-bold mb-4">Discover new recipes</h1>
              <p className="text-lg mb-8">Get inspired with our recipe generator that offers a wide variety of dishes for every taste and occasion.</p>
            </div>
          </section>
  
          <section className="w-full flex justify-center py-16">
            <div className="max-w-7xl w-full flex flex-col items-center px-12">
              <h2 className="text-3xl font-bold mb-8">Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <h3 className="text-2xl font-bold mb-4">Recipe Generator</h3>
                  <p>Create personalized recipes based on your dietary preferences and available ingredients.</p>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <h3 className="text-2xl font-bold mb-4">Farmers Market Place</h3>
                  <p>Connect with local farmers and vendors to source fresh, organic ingredients for your recipes.</p>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <h3 className="text-2xl font-bold mb-4">Community Engagement</h3>
                  <p>Join a community of food enthusiasts, share recipes, and exchange cooking tips.</p>
                </div>
              </div>
            </div>
          </section>
        </main>
      </>
    );
  };
  
  export default Dummy;