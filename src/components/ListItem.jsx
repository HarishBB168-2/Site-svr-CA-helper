const ListItem = ({ data }) => {
  return (
    <div
      style={{
        borderBottom: "2px solid black",
        display: "flex",
        columnGap: "2rem",
        margin: "3px",
        flexWrap: "wrap",
        flexDirection: "column",
      }}
    >
      <span>
        <strong>CA No</strong> : {data["Contract Account"]}
      </span>
      <span>
        <strong>Installation</strong> : {data["Installation No."]}
      </span>
      <span>
        <strong>Meter No</strong> : {data["Meter (Serial No)"]}
      </span>
      <span>
        <strong>Name</strong> : "{data["First Name"]}", "{data["Middle Name"]}",
        "{data["Last Name"]}""
      </span>
      <span>
        <strong>Building Code</strong> : {data["Building Code"]}
      </span>
      <span>
        <strong>CSN</strong> : {data["CSN"]}
      </span>
      <span>
        <strong>GSN</strong> : {data["GSN"]}
      </span>
      <span>
        <strong>Pole No</strong> : {data["No for pole/pillar"]}
      </span>
      <span>
        <strong>Contact</strong> : {data["Contact Number1"]},{" "}
        {data["Contact Number2"]}, {data["Contact Number3"]},{" "}
        {data["Contact Number4"]}
      </span>
    </div>
  );
};

export default ListItem;
