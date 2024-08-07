import React from 'react';// Corrected casing
import Header from '../components/layout/Header';
import FrButton from '../components/common/FrButton';
import Dummy from '../components/Dummy';

const AboutUsPage = () => {
    const teamMembers = [
        {
          name: 'Harsimran Singh',
          role: 'Frontend Engineer',
          image: '/harsimran.jpg',
        },
        {
          name: 'Sharan Kumar Kodimyala',
          role: 'Backend Engineer',
          image: '/sharan.jpg',
        },
        {
          name: 'Pavan Sai Rapeti',
          role: 'Full Stack engineer',
          image: '/pavan.jpg',
        },
      ];
    
      return (
        <div className="App">
            <Header />
          {/* About Section */}
          <section className="bg-frGray text-frBlack py-12">
          <FrButton width={10} text="Back" onClick={() => window.history.back()} />
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-4">About FarmRoots</h2>
              <p className="text-lg">
                FarmRoots connects consumers with local farmers, promoting sustainable agriculture and supporting the local food system. Our platform allows consumers to purchase fresh, locally grown produce directly from farmers, increasing access to healthy food, supporting local economies, and fostering a stronger connection between farmers and consumers.
              </p>
            </div>
          </section>
          <Dummy />
          {/* Benefits Section */}
          <section className="bg-frWhite text-frBlack py-12">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-4 text-center">Benefits of FarmRoots</h2>
              <ul className="list-disc list-inside text-lg space-y-2">
                <li>Fresh, healthy produce</li>
                <li>Supporting local farmers and the local economy</li>
                <li>Environmental benefits from sustainable agriculture practices</li>
                <li>Increased food transparency and traceability</li>
                <li>Opportunities for consumers to learn about agriculture and get involved in their food system</li>
              </ul>
            </div>
          </section>
         
          {/* Team Section */}
          <section className="bg-frGray py-12">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-8 text-center">Meet Our Team</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {teamMembers.map((member) => (
                  <div key={member.name} className="bg-frWhite shadow-lg rounded-lg overflow-hidden">
                    <img src={member.image} alt={member.name} className="w-full h-48 object-contain" />
                    <div className="p-6">
                      <h3 className="text-2xl font-bold mb-2">{member.name}</h3>
                      <p className="text-frGreendark">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
    
          {/* Footer */}
          <footer className="bg-frBlack text-frGray py-6">
            <div className="container mx-auto text-center">
              <p>&copy; 2024 FarmRoots. All rights reserved.</p>
            </div>
          </footer>
        </div>
      );
    };

export default AboutUsPage;