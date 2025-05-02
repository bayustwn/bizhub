function NotFound() {
 
    return(
        <div className="flex justify-center flex-col gap-5 items-center h-screen w-screen" >
            <img className="w-15" src="/assets/404.svg" alt="link broken" />
            <p className="font-placard font-normal text-3xl">404 | Page not found</p>
        </div>
    )

}

export default NotFound