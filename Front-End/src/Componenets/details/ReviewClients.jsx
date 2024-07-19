import React from 'react'
import Avatar from '../../ui/Avatar';
import Rating from '../../ui/Rating';
export default function ReviewClients({ detailsprd }) {
    return (
      <>
        <div className="w-fit ">
          <h6 className="font-bold  ">Reviews Clients</h6>
          <hr />
        </div>
        <div className="w-100% max-h-[500px] overflow-auto p-2 scrollbar">
          {detailsprd && detailsprd?.ratingAndReviews?.length > 0 ? (
            detailsprd?.ratingAndReviews
              .slice()
              .reverse()
              .map((e,i) => (
                <div key={i}>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1">
                      <Avatar name={e.userId.name} width={45} />
                      <p className="font-semibold text-sm">{e.userId.name}</p>
                    </div>
                    <div className="ml-2">
                      <Rating rating={e?.rating} />
                    </div>
                  </div>
                  <div>
                    <p className="ml-3 ">{e?.description}</p>
                  </div>
                  <hr />
                </div>
              ))
          ) : (
            <p className="text-center">Not Review Yet</p>
          )}
        </div>
      </>
    );
}
