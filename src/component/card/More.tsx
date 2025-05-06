interface moreStyle{
    style?:string
}

function More({style}:moreStyle) {
  return (
    <div className={`p-3 rounded-md cursor-pointer bg-primary-200 ${style}`}>
      <img src="/assets/icons/more.svg" className="w-5" alt="more" />
    </div>
  );
}

export default More;
