import React, { useEffect, useState } from "react";
import TabsComponent from "./common/TabsComponent";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./common/Loader";
import { fetchBlogsRequest, fetchPostRequest, fetchProductsRequest, loadMorePostsRequest } from "../store/actions/farmActions/actions";

const FarmerMode = () => {
  const posts = useSelector((state) => state.farm.posts);
  const user = useSelector((state) => state.auth.user);
  const products = useSelector((state) => state.product.products);
  const blogs = useSelector((state) => state.blog.blogs);
  const loading = useSelector((state) => state.farm.loading);
  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = posts.filter((post) =>
    searchQuery ? post.description.toLowerCase().includes(searchQuery?.toLowerCase()) : post
  );

  const filteredProducts = products.filter((product) =>
    searchQuery ? product.name.toLowerCase().includes(searchQuery.toLowerCase()) : product
  );

  const filteredBlogs = blogs.filter((blog) =>
    searchQuery ? blog.title.toLowerCase().includes(searchQuery.toLowerCase()) : blog
  );

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    dispatch(fetchPostRequest());
    dispatch(fetchBlogsRequest());
    dispatch(fetchProductsRequest());
  }, [dispatch]);
  

  return (
    <div className="App bg-frGray min-h-screen">
      <div className="container py-4 px-4">
        <input
          type="text"
          placeholder="Search for posts, products, or blogs..."
          className="w-full p-2 rounded-lg border-2 border-frGreen focus:outline-none focus:ring-2 focus:ring-frGreen"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Main Content */}
      <main className=" py-8 px-4 flex">
        <div className="w-1/6">
           <h2 className="text-3xl font-bold mb-4 text-center mt-8 text-frGreen">Your Profile</h2>
           {user.data ? (
             <div className="bg-white p-4 rounded-lg shadow-md">
               <div className="flex items-center mb-4">
                 <div className="w-12 h-12 rounded-full bg-frGreen flex items-center justify-center text-white text-xl font-bold">
                   {user.data.first.charAt(0)}
                 </div>
                 <div className="ml-4">
                   <h2 className="text-2xl font-bold text-frGreen">{user.data.first} {user.data.last}</h2>
                   <p className="text-sm text-gray-600">{user.data.email}</p>
                 </div>
               </div>
             </div>
           ) : (
             <p className="text-sm text-gray-600">N/A</p>
           )}
          <div className="bg-frLighterGray p-6 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold mb-4 text-center text-frGreen">What You Can Do</h2>
            <ul className="list-disc pl-5 space-y-2 text-lg text-frGreen">
              <li>Explore various posts shared by the community.</li>
              <li>Discover and purchase products from local farmers.</li>
              <li>Read and engage with blogs written by fellow farmers.</li>
              <li>Use the search bar to quickly find specific content.</li>
            </ul>
         
          </div>
        </div>
        <div className="w-2/3 mx-auto">
          <h1 className="text-5xl font-extrabold mb-8 text-center text-frGreen">Farmer Mode</h1>
          <p className="text-center mb-8 text-lg text-frGreen">
            Welcome to Farmer Mode! Here you can explore posts, products, and blogs shared by the community. Use the search bar above to find specific content.
          </p>
          <TabsComponent
            filteredPosts={filteredPosts}
            filteredProducts={filteredProducts}
            filteredBlogs={filteredBlogs}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-frGreen text-frWhite py-4 mt-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 FarmRoots Market. All rights reserved.</p>
        </div>
      </footer>
      {loading && <Loader isTransparent={true} />}
      <button
        onClick={scrollToTop}
        className="fixed bottom-4 right-4 bg-frGreen text-white p-3 rounded-full shadow-lg hover:bg-frDarkGreen"
      >
        Go to Top
      </button>
    </div>
  );
};

export default FarmerMode;