import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCertificate, faTags, faShieldAlt } from '@fortawesome/free-solid-svg-icons';

function Services() {
  return (
    <section id="company-services" className="py-9 bg-[#D7DDDF]">
      <div className="pl-3">
        <div className="flex flex-wrap -mx-5 justify-between pt-5">
         
          <div className="w-full md:w-1/2 lg:w-1/4 px-4 pb-3">
            <div className="icon-box flex mb-6 "> {/* Added mb-6 */}
              <div className="icon-box-icon pr-3 pb-3">
                <FontAwesomeIcon icon={faCertificate} className="text-red-500" />
              </div>
              <div className="icon-box-content">
                <h3 className="card-title text-uppercase text-dark">Quality guarantee</h3>
               
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/4 px-4 pb-3">
            <div className="icon-box flex mb-6"> {/* Added mb-6 */}
              <div className="icon-box-icon pr-3 pb-3">
                <FontAwesomeIcon icon={faTags} className="text-red-500" />
              </div>
              <div className="icon-box-content">
                <h3 className="card-title text-uppercase text-dark">Daily offers</h3>
               
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/4 px-4 pb-3">
            <div className="icon-box flex mb-6"> {/* Added mb-6 */}
              <div className="icon-box-icon pr-3 pb-3">
                <FontAwesomeIcon icon={faShieldAlt} className="text-red-500" />
              </div>
              <div className="icon-box-content">
                <h3 className="card-title text-uppercase text-dark">100% secure payment</h3>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Services;
