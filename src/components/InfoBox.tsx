interface IProps {
  title: string;
  info: string;
}

const InfoBox: React.FC<IProps> = ({ title, info }) => {
  return (
    <div className="w-full mb-5 flex justify-center items-center flex-col md:border-r md:w-[23%] md:last:border-r-0 md:justify-start md:mb-0">
      <h4 className="text-dark-gray font-bold text-xs uppercase tracking-wide md:mb-4">
        {title}
      </h4>
      <p className="text-xl font-medium">{info}</p>
    </div>
  );
};

export default InfoBox;
