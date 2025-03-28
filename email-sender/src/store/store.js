import { configureStore, createSlice } from "@reduxjs/toolkit";

const campaignSlice = createSlice({
  name: "campaign",
  initialState: {
    subject: "",
    sender: "",
    recipients: "",
    content: null, // { config, html } when confirmed
    templateId: null,
    campaignId: null,
  },
  reducers: {
    updateField(state, action) {
      const { field, value } = action.payload;
      state[field] = value;
    },
    setContent(state, action) {
      state.content = action.payload;
    },
    setTemplateId(state, action) {
      state.templateId = action.payload;
    },
    setCampaignId(state, action) {
      state.campaignId = action.payload;
    },
    resetCampaign(state) {
      state.subject = "";
      state.sender = "";
      state.recipients = "";
      state.content = null;
      state.campaignId = null;
      state.templateId = null;
    },
  },
});

export const {
  updateField,
  setContent,
  setTemplateId,
  setCampaignId,
  resetCampaign,
} = campaignSlice.actions;

const store = configureStore({
  reducer: {
    campaign: campaignSlice.reducer,
  },
});

export default store;
