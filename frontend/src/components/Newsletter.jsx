import React, { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState("");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400..800&display=swap');
        
        .syne-font {
          font-family: 'Syne', sans-serif;
        }

        .input-group:focus-within {
          border-color: #000;
        }
      `}</style>

      <section className="syne-font w-full py-24 bg-white flex justify-center px-6">
        <div className="max-w-5xl w-full">
          
          {/* Top Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-end">
            <div className="lg:col-span-7">
              <h2 className="text-black text-4xl md:text-6xl font-extrabold leading-none tracking-tighter uppercase">
                Stay in <br />
                <span className="italic font-normal">the</span> loop.
              </h2>
            </div>
            
            <div className="lg:col-span-5">
              <p className="text-gray-500 text-base md:text-lg leading-relaxed max-w-xs">
                A weekly digest of high-end design, code snippets, and digital culture. 
              </p>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-100 pt-10">
            <form 
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col md:flex-row items-center gap-4"
            >
              <div className="input-group relative flex-1 w-full border-b border-gray-200 transition-all duration-300">
                <input
                  type="email"
                  placeholder="EMAIL ADDRESS"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-transparent outline-none text-black py-4 w-full text-lg md:text-xl font-bold placeholder:text-gray-300 tracking-tight"
                  required
                />
              </div>

              <button 
                type="submit"
                className="w-full md:w-auto bg-black text-white font-extrabold px-8 py-4 rounded-full hover:bg-orange-600 transition-all duration-300 uppercase text-sm tracking-tighter"
              >
                Subscribe
              </button>
            </form>

            {/* Footer Stats */}
            <div className="mt-10 flex flex-wrap gap-10 items-center">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-1">Subscribers</p>
                <p className="text-lg font-extrabold">24.8K</p>
              </div>
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-1">Frequency</p>
                <p className="text-lg font-extrabold">Weekly</p>
              </div>
              <div className="ml-auto hidden md:block">
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-300 text-right">
                  © 2026 DAPORTER
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}