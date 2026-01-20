import type { Blog } from "../types/blog";

const BASE_URL = "http://localhost:3001/blogs";

const handleResponse = async (res: Response) => {
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Something went wrong");
  }
  return res.json();
};

export const getBlogs = async (): Promise<Blog[]> => {
  const res = await fetch(BASE_URL);
  if (!res.ok) handleResponse(res);
  return res.json();
};

export const getBlogById = async (id: number): Promise<Blog> => {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) handleResponse(res);
  return res.json();
};

export const createBlog = async (blog: Blog): Promise<Blog> => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(blog),
  });
  if (!res.ok) handleResponse(res);
  return res.json();
};

/**
 * Delete a blog by ID
 * @param id - Blog ID to delete
 */
export const deleteBlog = async (id: number | string): Promise<void> => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) handleResponse(res);
};
