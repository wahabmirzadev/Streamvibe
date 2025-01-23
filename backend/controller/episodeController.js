const { isValidObjectId } = require('mongoose');
const path = require('path');

const Episode = require('../model/episodeModel');
const Season = require('../model/seasonModel');
const { episodeUploader } = require('../utils/videoUploader');
const { createEpisodeValidation } = require('../validation/episodeValidation');


//! Single Episode
exports.getEpisodeById = async (req, res) => {
    try {
        const episode = await Episode.findById(req.params.id);
        if (!episode) return res.status(404).json({ status: 404, message: "Episode not found" });

        res.status(200).json({
            status: 200,
            message: "fetch data successfully",
            episode
        });
    } catch (err) {
        res.status(404).json({
            status: 404,
            message: "fail",
            message: err
        });
    }
};


exports.getEpisodeByEpisodeNumber = async (req, res) => {
    const { series, season, episodeNumber } = req.params;

    if (!isValidObjectId(series)) {
        return res.status(400).json({ status: 400, message: "Invalid series ID" });
    }

    if (isNaN(season) || isNaN(episodeNumber)) {
        return res.status(400).json({ status: 400, message: "Season number and episode number must be valid numbers" });
    }

    try {
        const episode = await Episode.findOne({
            series,
            seasonNumber: parseInt(season, 10),
            episodeNumber: parseInt(episodeNumber, 10)
        })
            .populate(
                {
                    path: "series", select: "title director release_date genres rotten_rating imdb_rating actors",
                    populate: { path: "director actors", select: "directorId actorId fullName profile birthPlace" },
                })
            .select("title files pictures");

        if (!episode) {
            return res.status(404).json({ status: 404, message: "Episode not found" });
        }

        res.status(200).json({
            status: 200,
            message: "Episode fetched successfully",
            episode
        });
    } catch (err) {
        res.status(500).json({
            status: 500,
            message: "An error occurred while fetching the episode",
            error: err.message
        });
    }
};


exports.createEpisode = [episodeUploader, createEpisodeValidation, async (req, res) => {
    //! must send seriesTitle in the body
    try {
        if (req.files.pictures) {
            const pictureUrls = req.files.pictures.map(picture => picture.filename);
            req.body.pictures = pictureUrls;
        }
        else return res.status(400).json({ status: 400, message: "Pictures are required" });
        if (req.files.files) {
            const fileUrls = req.files.files.map(file => file.filename);
            req.body.files = fileUrls.map((url, index) => ({
                quality: "1080p",
                url
            }));
        }

        else return res.status(400).json({ status: 400, message: "Files are required" });

        const season = await Season.findOne({ series: req.body.series, seasonNumber: req.body.seasonNumber });
        if (!season) return res.status(404).json({ status: 404, message: "Season not found" });

        const newEpisode = await Episode.create(req.body);
        //! push episode id to season model
        season.episodes.push(newEpisode._id);
        await season.save();

        res.status(201).json({
            status: 201,
            message: 'Episode created successfully',
            episode: newEpisode
        });
    } catch (err) {
        res.status(400).json({
            status: 404,
            message: "fail",
            message: err
        });
    }
}];

//! must edit this controller
exports.updateEpisode = async (req, res) => {
    try {
        const episode = await Episode.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({
            status: 200,
            message: "Episode updated successfully",
            data: {
                episode
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 404,
            message: "fail",
            message: err
        });
    }
};

exports.deleteEpisode = async (req, res) => {
    try {
        const episode = await Episode.findByIdAndDelete(req.params.id);
        if (!episode) return res.status(404).json({ status: 404, message: "Episode not found" });
        res.status(200).json({
            status: 204,
            message: "Episode deleted successfully",
            data: null
        });
    } catch (err) {
        res.status(404).json({
            status: 404,
            message: "fail",
            message: err
        });
    }
};

exports.downloadEpisode = async (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ status: 400, message: "URL is required" });
    }

    try {
        const file = path.join(__dirname,"..", `public`,"videos", url);
        // console.log(file)
        res.download(file)
    } catch (err) {
        res.status(500).json({
            status: 500,
            message: "An error occurred while downloading the episode",
            error: err.message
        });
    }
};