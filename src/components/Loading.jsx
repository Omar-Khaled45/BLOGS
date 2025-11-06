const Loading = () => {
  return (
    <div className="fixed inset-0 z-50 flex min-h-screen items-center justify-center bg-secBackground">
      <svg className="loader" viewBox="25 25 50 50">
        <circle r="20" cy="50" cx="50"></circle>
      </svg>
    </div>
  );
};

export default Loading;
