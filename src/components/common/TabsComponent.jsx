import React, { useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import FeedSection from "../FeedSection";
import MarketplaceSection from "../MarketplaceSection";
import BlogForm from "../BlogForm";
import BlogComponent from "../BlogComponent";
import "./TabsComponent.css";
import { addBlogRequest } from "../../store/actions/farmActions/actions";
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from "react-redux";

const TabsComponent = ({
  filteredPosts,
  handleAddPost,
  loadMorePosts,
  filteredProducts,
  filteredBlogs,
  defaultIndex = 0,
}) => {
  const dispatch = useDispatch();
  const [tabIndex, setTabIndex] = useState(defaultIndex);
  const [newBlog, setNewBlog] = useState({
    title: "",
    content: "",
    author: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const handleBlogChange = (e) => {
    const { name, value } = e.target;
    setNewBlog((prevBlog) => ({
      ...prevBlog,
      [name]: value,
    }));
  };

  const handleAddBlog = () => {
    // Logic to handle adding a new blog
    dispatch(addBlogRequest(newBlog));
    // Reset the form after adding the blog
    setNewBlog({
      title: "",
      content: "",
      author: "",
    });
  };

  const handleBlogClick = (blog) => {
    setSelectedBlog(blog);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedBlog(null);
  };

  return (
    <>
      <Tabs
        id="controlled-tab-example"
        activeKey={tabIndex}
        onSelect={(k) => setTabIndex(k)}
        className="custom-tabs"
      >
        <Tab eventKey={0} title="Feed" tabClassName="custom-tab">
          <FeedSection
            posts={filteredPosts}
            addPost={handleAddPost}
            loadMorePosts={loadMorePosts}
          />
        </Tab>

        <Tab eventKey={1} title="Marketplace" tabClassName="custom-tab">
          <MarketplaceSection
            products={filteredProducts}
          />
        </Tab>
        <Tab eventKey={2} title="Community Blog" tabClassName="custom-tab">
          <section className="py-12 custom-tab-content">
            <h2 className="text-3xl font-bold mb-8 text-center text-frDarkGreen">
              Community Blog
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.map((blog) => (
                <div
                  key={blog.id}
                  className="bg-frWhite shadow-lg rounded-lg overflow-hidden cursor-pointer"
                  onClick={() => handleBlogClick(blog)}
                >
                  <div className="p-4">
                    <h3 className="text-2xl font-bold mb-2 text-frDarkGreen">
                      {blog.title}
                    </h3>
                    <p className="text-frDarkGreen">{blog.author}</p>
                    <p>{blog.content}</p>
                  </div>
                </div>
              ))}
            </div>
            <BlogForm
              newBlog={newBlog}
              handleBlogChange={handleBlogChange}
              handleAddBlog={handleAddBlog}
            />
          </section>
        </Tab>
      </Tabs>
      <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
        <Modal.Header closeButton className="bg-frWhite text-frGreendark">
          <Modal.Title className="w-100 text-center">{selectedBlog?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          {selectedBlog && <BlogComponent blog={selectedBlog} />}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default TabsComponent;