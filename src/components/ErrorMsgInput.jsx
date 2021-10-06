export default function ErrorMsgInput({children}) {
   return (
      <span className='text-danger' style={{fontSize: 12}}>
         {children}
      </span>
   );
}