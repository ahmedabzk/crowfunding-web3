import { useStateContext } from "../context";
import { useState } from "react";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";
import { money } from "../assets";
import Loader from "../components/Loader";
import style from "../styles/CreateCampaign.module.css";
import { checkIfImage } from "../utils";
import FormField from "../components/FormField";
import CustomButton from "../components/CustomButton";

function CreateCampaign() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const { createCampaign } = useStateContext();

  const [form, setForm] = useState({
    name: "",
    title: "",
    description: "",
    target: "",
    amountCollected: 0,
    deadline: "",
    image: "",
  });

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    checkIfImage(form.image, async (exists) => {
      if (exists) {
        setIsLoading(true);
        await createCampaign({ ...form, target: ethers.utils.parseUnits(form.target, 18) });
        setIsLoading(false);
        navigate('/')
      } else {
        alert("Provide valid image URL");
        setForm({ ...form, image: '' });
      }
    })
  }

  return (
    <div className={style.campaign}>
      {isLoading && <Loader />}
      <div className={style.title_wrapper}>
        <h1>Start a Campaign</h1>
      </div>
      <form className={style.forms} onSubmit={handleSubmit}>
        <div className={style.form_headers}>
          <FormField
            labelName="Your name"
            placeholder="ahmed hassan"
            inputType="text"
            value={form.name}
            handleChange={(e) => handleFormFieldChange("name", e)}
          />
          <FormField
            labelName="Campaign Title"
            placeholder="Write a title"
            inputType="text"
            value={form.title}
            handleChange={(e) => handleFormFieldChange("title", e)}
          />
        </div>
        <FormField
          labelName="Story"
          placeholder="Write your story"
          isTextArea
          value={form.description}
          handleChange={(e) => handleFormFieldChange("description", e)}
        />
        <div className={style.raised_money}>
          <img src={money} alt="money" className={style.money_img} />
          <h4>You will get 100% of the raised amount</h4>
        </div>

        <div className={style.goal_section}>
          <FormField
            labelName="Goal *"
            placeholder="ETH 0.50"
            inputType="text"
            value={form.target}
            handleChange={(e) => handleFormFieldChange("target", e)}
          />
          <FormField
            labelName="End Date *"
            placeholder="End Date"
            inputType="date"
            value={form.deadline}
            handleChange={(e) => handleFormFieldChange("deadline", e)}
          />
        </div>
        <FormField
          labelName="Campaign image *"
          placeholder="Place image URL of your campaign"
          inputType="url"
          value={form.image}
          handleChange={(e) => handleFormFieldChange("image", e)}
        />
        <div className={style.btn}>
          <CustomButton
            btnType="submit"
            title="Submit new campaign"
            styles={`${style.btn_styles}`}
          />
        </div>
      </form>
    </div>
  );
}

export default CreateCampaign;
