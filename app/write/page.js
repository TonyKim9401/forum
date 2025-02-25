export default function Write() {
  return (
    <div className="p-20">
      <h1>Upload posting</h1>
      <form action="/api/post/new" method="POST">
        <input name="title" placeholder="posting name" />
        <input name="content" placeholder="posting content" />
        <button type="submit">Button</button>
      </form>
    </div>
  );
}
